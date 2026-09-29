export interface LiveEarningsInputs {
  views: number;
  cpm: number;
  grossSuperChats: number;
  newMembers: number;
}

export interface LiveEarningsEstimate {
  adRevenue: number;
  superChatRevenue: number;
  membershipRevenue: number;
  total: number;
}

const roundCents = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

/** A simple scenario estimate. Views are treated as monetized playbacks. */
export function calculateLiveEarnings({
  views,
  cpm,
  grossSuperChats,
  newMembers,
}: LiveEarningsInputs): LiveEarningsEstimate | null {
  if (
    !Number.isSafeInteger(views) || views < 0 ||
    !Number.isFinite(cpm) || cpm < 0 ||
    !Number.isFinite(grossSuperChats) || grossSuperChats < 0 ||
    !Number.isSafeInteger(newMembers) || newMembers < 0
  ) {
    return null;
  }

  const adRevenue = roundCents((views / 1000) * cpm * 0.55);
  const superChatRevenue = roundCents(grossSuperChats * 0.7);
  const membershipRevenue = roundCents(newMembers * 3.5);
  const total = roundCents(adRevenue + superChatRevenue + membershipRevenue);
  if (![adRevenue, superChatRevenue, membershipRevenue, total].every(Number.isFinite)) return null;

  return { adRevenue, superChatRevenue, membershipRevenue, total };
}
