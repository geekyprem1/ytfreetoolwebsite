export interface CreatorIncomeInputs {
  monthlyViews: number;
  rpm: number;
  sponsorshipDeals: number;
  sponsorshipFee: number;
  affiliateClicks: number;
  conversionRate: number;
  commissionPerSale: number;
}

export interface CreatorIncomeEstimate {
  youtubeRpmRevenue: number;
  sponsorshipRevenue: number;
  affiliateRevenue: number;
  monthlyTotal: number;
  yearlyTotal: number;
}

const roundCents = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

/** Uses the creator's own RPM and sponsorship/affiliate assumptions; it applies no extra platform cut. */
export function calculateCreatorIncome(inputs: CreatorIncomeInputs): CreatorIncomeEstimate | null {
  const {
    monthlyViews,
    rpm,
    sponsorshipDeals,
    sponsorshipFee,
    affiliateClicks,
    conversionRate,
    commissionPerSale,
  } = inputs;

  if (
    !Number.isSafeInteger(monthlyViews) || monthlyViews < 0 ||
    !Number.isFinite(rpm) || rpm < 0 ||
    !Number.isSafeInteger(sponsorshipDeals) || sponsorshipDeals < 0 ||
    !Number.isFinite(sponsorshipFee) || sponsorshipFee < 0 ||
    !Number.isSafeInteger(affiliateClicks) || affiliateClicks < 0 ||
    !Number.isFinite(conversionRate) || conversionRate < 0 || conversionRate > 100 ||
    !Number.isFinite(commissionPerSale) || commissionPerSale < 0
  ) {
    return null;
  }

  const youtubeRpmRevenue = roundCents((monthlyViews / 1000) * rpm);
  const sponsorshipRevenue = roundCents(sponsorshipDeals * sponsorshipFee);
  const affiliateRevenue = roundCents(affiliateClicks * (conversionRate / 100) * commissionPerSale);
  const monthlyTotal = roundCents(youtubeRpmRevenue + sponsorshipRevenue + affiliateRevenue);
  const yearlyTotal = roundCents(monthlyTotal * 12);

  if (![youtubeRpmRevenue, sponsorshipRevenue, affiliateRevenue, monthlyTotal, yearlyTotal].every(Number.isFinite)) {
    return null;
  }

  return { youtubeRpmRevenue, sponsorshipRevenue, affiliateRevenue, monthlyTotal, yearlyTotal };
}
