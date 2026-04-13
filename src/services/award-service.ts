import { AWARDS_DETAIL } from "@/data/awards-detail";
import type { AwardDetail } from "@/types/award";

// TODO: Replace with Supabase query + unstable_cache when API is ready
export function getAwardDetails(): AwardDetail[] {
	return AWARDS_DETAIL;
}
