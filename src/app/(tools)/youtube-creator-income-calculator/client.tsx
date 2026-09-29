'use client';

import { useMemo, useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { calculateCreatorIncome, type CreatorIncomeEstimate, type CreatorIncomeInputs } from '@/lib/youtube/creator-income';

type Scenario = 'base' | 'low' | 'high';
type ScenarioInputs = Record<keyof CreatorIncomeInputs, string>;

const emptyInputs = (): ScenarioInputs => ({
  monthlyViews: '',
  rpm: '',
  sponsorshipDeals: '',
  sponsorshipFee: '',
  affiliateClicks: '',
  conversionRate: '',
  commissionPerSale: '',
});

const scenarioNames: Record<Scenario, string> = {
  base: 'Base case',
  low: 'Low case',
  high: 'High case',
};

const scenarioOrder: Scenario[] = ['base', 'low', 'high'];
const currencyOptions = [
  { value: 'USD', label: 'USD — US dollar' },
  { value: 'INR', label: 'INR — Indian rupee' },
  { value: 'GBP', label: 'GBP — British pound' },
  { value: 'EUR', label: 'EUR — euro' },
];

const inputDefinitions: {
  key: keyof CreatorIncomeInputs;
  label: string;
  description: string;
  integer?: boolean;
  percent?: boolean;
}[] = [
  { key: 'monthlyViews', label: 'Monthly views', description: 'Use the views covered by the RPM you enter.', integer: true },
  { key: 'rpm', label: 'Your YouTube RPM', description: 'Creator revenue per 1,000 views, from YouTube Analytics.' },
  { key: 'sponsorshipDeals', label: 'Sponsorship deals per month', description: 'Count only deals you expect in a typical month.', integer: true },
  { key: 'sponsorshipFee', label: 'Fee per sponsorship deal', description: 'Enter the amount you receive per deal, in the selected currency.' },
  { key: 'affiliateClicks', label: 'Affiliate clicks per month', description: 'Estimated clicks on your tracked affiliate links.', integer: true },
  { key: 'conversionRate', label: 'Affiliate conversion rate (%)', description: 'Share of clicks that result in a commissionable sale.', percent: true },
  { key: 'commissionPerSale', label: 'Commission per sale', description: 'Your average commission for one sale, in the selected currency.' },
];

function parseInputs(values: ScenarioInputs): CreatorIncomeInputs | null {
  const parse = (value: string) => value.trim() === '' ? 0 : Number(value);
  const parsed: CreatorIncomeInputs = {
    monthlyViews: parse(values.monthlyViews),
    rpm: parse(values.rpm),
    sponsorshipDeals: parse(values.sponsorshipDeals),
    sponsorshipFee: parse(values.sponsorshipFee),
    affiliateClicks: parse(values.affiliateClicks),
    conversionRate: parse(values.conversionRate),
    commissionPerSale: parse(values.commissionPerSale),
  };
  if (Object.values(parsed).some((value) => !Number.isFinite(value))) return null;
  return parsed;
}

function inputError(key: keyof CreatorIncomeInputs, raw: string): string | undefined {
  if (raw.trim() === '') return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value)) return 'Enter a valid number.';
  if (value < 0) return 'Use zero or a positive value.';
  if (['monthlyViews', 'sponsorshipDeals', 'affiliateClicks'].includes(key) && !Number.isSafeInteger(value)) {
    return 'Use a whole number.';
  }
  if (key === 'conversionRate' && value > 100) return 'Conversion rate must be 100% or less.';
  return undefined;
}

function hasEnteredValue(values: ScenarioInputs): boolean {
  return Object.values(values).some((value) => value.trim() !== '');
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function EstimateBreakdown({ estimate, currency }: { estimate: CreatorIncomeEstimate; currency: string }) {
  const rows = [
    ['YouTube revenue at RPM', estimate.youtubeRpmRevenue],
    ['Sponsorship revenue', estimate.sponsorshipRevenue],
    ['Affiliate commissions', estimate.affiliateRevenue],
  ] as const;

  return (
    <dl className="space-y-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 text-sm">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-medium tabular-nums">{formatCurrency(value, currency)}</dd>
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 border-t pt-2 text-sm font-semibold">
        <dt>Monthly total</dt>
        <dd className="tabular-nums">{formatCurrency(estimate.monthlyTotal, currency)}</dd>
      </div>
      <div className="flex items-center justify-between gap-4 text-sm font-semibold">
        <dt>Yearly projection</dt>
        <dd className="tabular-nums">{formatCurrency(estimate.yearlyTotal, currency)}</dd>
      </div>
    </dl>
  );
}

export function YoutubeCreatorIncomeCalculatorClient() {
  const [currency, setCurrency] = useState('USD');
  const [activeScenario, setActiveScenario] = useState<Scenario>('base');
  const [enabledScenarios, setEnabledScenarios] = useState<Scenario[]>(['base']);
  const [scenarioInputs, setScenarioInputs] = useState<Record<Scenario, ScenarioInputs>>({
    base: emptyInputs(),
    low: emptyInputs(),
    high: emptyInputs(),
  });

  const activeInputs = scenarioInputs[activeScenario];
  const activeErrors = inputDefinitions
    .map(({ key }) => inputError(key, activeInputs[key]))
    .filter((error): error is string => Boolean(error));
  const hasActiveInput = hasEnteredValue(activeInputs);
  const activeEstimate = useMemo(
    () => {
      const parsed = parseInputs(activeInputs);
      return parsed ? calculateCreatorIncome(parsed) : null;
    },
    [activeInputs],
  );

  const comparisons = useMemo(() => scenarioOrder
    .filter((scenario) => enabledScenarios.includes(scenario))
    .map((scenario) => {
      const values = scenarioInputs[scenario];
      const parsed = parseInputs(values);
      const errors = inputDefinitions.some(({ key }) => inputError(key, values[key]));
      return {
        scenario,
        estimate: !errors && parsed && hasEnteredValue(values) ? calculateCreatorIncome(parsed) : null,
        hasInput: hasEnteredValue(values),
        hasErrors: errors,
      };
    }), [enabledScenarios, scenarioInputs]);

  function changeInput(key: keyof CreatorIncomeInputs, value: string) {
    setScenarioInputs((current) => ({
      ...current,
      [activeScenario]: { ...current[activeScenario], [key]: value },
    }));
  }

  function addScenario(scenario: 'low' | 'high') {
    setScenarioInputs((current) => ({ ...current, [scenario]: { ...current.base } }));
    setEnabledScenarios((current) => current.includes(scenario) ? current : [...current, scenario]);
    setActiveScenario(scenario);
  }

  function resetScenario(scenario: 'low' | 'high') {
    setScenarioInputs((current) => ({ ...current, [scenario]: { ...current.base } }));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.45fr)]">
        <div className="rounded-xl border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
          Enter your own numbers. Empty fields are treated as zero; no RPM, sponsor rate or conversion benchmark is assumed.
        </div>
        <ToolInput label="Currency for all money fields" inputId="creator-income-currency" description="This only changes the currency label/format; it does not convert values.">
          <Select
            id="creator-income-currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            options={currencyOptions}
          />
        </ToolInput>
      </div>

      <div className="flex flex-wrap items-center gap-2" aria-label="Income scenarios">
        {scenarioOrder.filter((scenario) => enabledScenarios.includes(scenario)).map((scenario) => (
          <button
            key={scenario}
            type="button"
            aria-pressed={activeScenario === scenario}
            onClick={() => setActiveScenario(scenario)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeScenario === scenario ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >
            {scenarioNames[scenario]}
          </button>
        ))}
        {(['low', 'high'] as const).filter((scenario) => !enabledScenarios.includes(scenario)).map((scenario) => (
          <button
            key={scenario}
            type="button"
            onClick={() => addScenario(scenario)}
            className="rounded-full border border-dashed px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            + Add {scenarioNames[scenario].toLowerCase()}
          </button>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Low and high cases start as copies of Base. They do not apply automatic discounts or uplifts; edit each case to model your assumptions.
        {activeScenario !== 'base' && (
          <button type="button" onClick={() => resetScenario(activeScenario)} className="ml-2 font-medium text-primary underline underline-offset-2">
            Reset from Base
          </button>
        )}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {inputDefinitions.map(({ key, label, description, integer, percent }) => {
          const id = `creator-income-${activeScenario}-${key}`;
          const error = inputError(key, activeInputs[key]);
          return (
            <ToolInput key={key} label={label} inputId={id} description={description} error={error}>
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                min="0"
                max={percent ? '100' : undefined}
                step={integer ? '1' : percent ? '0.1' : '0.01'}
                value={activeInputs[key]}
                onChange={(event) => changeInput(key, event.target.value)}
                aria-invalid={Boolean(error)}
              />
            </ToolInput>
          );
        })}
      </div>

      {hasActiveInput && activeErrors.length > 0 && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          Fix the highlighted inputs to calculate this scenario.
        </p>
      )}

      {hasActiveInput && activeErrors.length === 0 && !activeEstimate && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          These values are too large to calculate safely. Reduce one or more inputs.
        </p>
      )}

      {hasActiveInput && activeErrors.length === 0 && activeEstimate && (
        <ToolOutput title={`${scenarioNames[activeScenario]} estimate`}>
          <div className="space-y-5">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
              <p className="text-sm text-muted-foreground">Estimated monthly creator revenue</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{formatCurrency(activeEstimate.monthlyTotal, currency)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Yearly projection: <strong className="text-foreground">{formatCurrency(activeEstimate.yearlyTotal, currency)}</strong>
              </p>
            </div>
            <EstimateBreakdown estimate={activeEstimate} currency={currency} />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Yearly projection repeats these monthly values 12 times. Revenue is before taxes and your own expenses; this is not profit. YouTube RPM is already creator revenue, so no second YouTube share is deducted.
            </p>
          </div>
        </ToolOutput>
      )}

      {enabledScenarios.length > 1 && (
        <section aria-labelledby="creator-income-comparison-title" className="space-y-3">
          <h2 id="creator-income-comparison-title" className="text-display text-lg font-semibold">Scenario comparison</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {comparisons.map(({ scenario, estimate, hasInput, hasErrors }) => (
              <div key={scenario} className="rounded-xl border p-4">
                <h3 className="font-semibold">{scenarioNames[scenario]}</h3>
                {estimate ? (
                  <>
                    <p className="mt-3 text-xs text-muted-foreground">Per month</p>
                    <p className="text-xl font-bold tabular-nums">{formatCurrency(estimate.monthlyTotal, currency)}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Per year · same inputs × 12</p>
                    <p className="font-medium tabular-nums">{formatCurrency(estimate.yearlyTotal, currency)}</p>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {hasErrors ? 'Fix inputs to see this case.' : hasInput ? 'This case is outside the safe calculation range.' : 'Enter assumptions for this case.'}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Cases are your editable assumptions, not statistical confidence ranges or forecasts.</p>
        </section>
      )}

      <RelatedTools currentSlug="youtube-creator-income-calculator" />
    </div>
  );
}
