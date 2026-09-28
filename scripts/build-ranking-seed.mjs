/**
 * Builds src/content/rankings/channels.ts — the pool of channels the
 * /youtube-rankings pages track.
 *
 * The YouTube Data API has no "most subscribed channels" endpoint, so we keep a
 * curated list of handles here, resolve each one to its channel ID once
 * (channels.list?forHandle — 1 quota unit per handle), drop anything that does
 * not resolve or is below MIN_SUBSCRIBERS (guards against look-alike handles),
 * and write the IDs to a TS file. The site then refreshes stats for all IDs in
 * batches of 50 (1 unit per 50 channels).
 *
 * Usage:  node scripts/build-ranking-seed.mjs
 * Needs:  YOUTUBE_API_KEY in the environment or in .env.local
 *
 * To add a channel: append [handle, category, countryCode] below and re-run.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'content', 'rankings', 'channels.ts');
const MIN_SUBSCRIBERS = 5_000_000;

/**
 * [handle, category, ISO country].
 * The curated country is used as-is: the API's `snippet.country` is optional and
 * often reflects where a creator lives now rather than where their audience is.
 */
const SEED = [
  // ── Music ────────────────────────────────────────────────────────────
  ['tseries', 'music', 'IN'], ['zeemusiccompany', 'music', 'IN'], ['SonyMusicIndia', 'music', 'IN'],
  ['tipsofficial', 'music', 'IN'], ['saregamamusic', 'music', 'IN'], ['SpeedRecords', 'music', 'IN'],
  ['AdityaMusic', 'music', 'IN'], ['SonyMusicSouthVEVO', 'music', 'IN'], ['tseriesbhaktisagar', 'music', 'IN'],
  ['yrf', 'music', 'IN'], ['SidhuMooseWalaOfficial', 'music', 'IN'], ['WaveMusicIndia', 'music', 'IN'],
  ['tseriestamil', 'music', 'IN'],
  ['justinbieber', 'music', 'CA'], ['EdSheeran', 'music', 'GB'], ['eminem', 'music', 'US'],
  ['arianagrande', 'music', 'US'], ['TaylorSwift', 'music', 'US'], ['marshmello', 'music', 'US'],
  ['rihanna', 'music', 'US'], ['katyperry', 'music', 'US'], ['BillieEilish', 'music', 'US'],
  ['shakira', 'music', 'CO'], ['brunomars', 'music', 'US'], ['maroon5', 'music', 'US'],
  ['ImagineDragons', 'music', 'US'], ['OneDirectionVEVO', 'music', 'GB'], ['selenagomez', 'music', 'US'],
  ['TheWeeknd', 'music', 'CA'], ['PostMalone', 'music', 'US'], ['DrakeOfficial', 'music', 'CA'],
  ['NickiMinaj', 'music', 'US'], ['ladygaga', 'music', 'US'], ['ChrisBrownTV', 'music', 'US'],
  ['daddyyankee', 'music', 'PR'], ['BadBunnyPR', 'music', 'PR'],
  ['jbalvin', 'music', 'CO'], ['Ozuna', 'music', 'PR'],
  ['karolg', 'music', 'CO'], ['Anitta', 'music', 'BR'], ['LuisFonsi', 'music', 'PR'],
  ['EnriqueIglesias', 'music', 'ES'], ['pitbull', 'music', 'US'], ['wizkhalifa', 'music', 'US'],
  ['coldplay', 'music', 'GB'], ['adele', 'music', 'GB'], ['dualipa', 'music', 'GB'],
  ['beyonce', 'music', 'US'], ['sia', 'music', 'AU'], ['charlieputh', 'music', 'US'],
  ['ShawnMendes', 'music', 'CA'], ['camilacabello', 'music', 'US'], ['linkinpark', 'music', 'US'],
  ['Avicii', 'music', 'SE'], ['davidguetta', 'music', 'FR'], ['CalvinHarris', 'music', 'GB'],
  ['TheChainsmokers', 'music', 'US'], ['Queen', 'music', 'GB'], ['michaeljackson', 'music', 'US'],
  ['Alanwalkermusic', 'music', 'NO'], ['SpinninRecords', 'music', 'NL'], ['TrapNation', 'music', 'US'],
  ['NoCopyrightSounds', 'music', 'GB'], ['WORLDSTARHIPHOP', 'music', 'US'], ['OliviaRodrigo', 'music', 'US'],
  ['BTS', 'music', 'KR'], ['BLACKPINK', 'music', 'KR'], ['HYBELABELS', 'music', 'KR'],
  ['SMTOWN', 'music', 'KR'], ['JYPEntertainment', 'music', 'KR'], ['1theK', 'music', 'KR'],
  ['StrayKids', 'music', 'KR'], ['TWICE', 'music', 'KR'], ['JFlaMusic', 'music', 'KR'],
  ['KondZilla', 'music', 'BR'], ['GR6EXPLODE', 'music', 'BR'], ['gmmgrammy', 'music', 'TH'],
  ['HarryStyles', 'music', 'GB'], ['LittleMix', 'music', 'GB'], ['SamSmith', 'music', 'GB'],

  // ── Entertainment ────────────────────────────────────────────────────
  ['MrBeast', 'entertainment', 'US'], ['MrBeast2', 'entertainment', 'US'], ['BeastReacts', 'entertainment', 'US'],
  ['setindia', 'entertainment', 'IN'], ['sonysab', 'entertainment', 'IN'], ['zeetv', 'entertainment', 'IN'],
  ['colorstv', 'entertainment', 'IN'], ['StarPlus', 'entertainment', 'IN'], ['SunTV', 'entertainment', 'IN'],
  ['VijayTelevision', 'entertainment', 'IN'], ['loganpaulvlogs', 'entertainment', 'US'], ['jakepaul', 'entertainment', 'US'],
  ['SSSniperWolf', 'entertainment', 'US'], ['IShowSpeed', 'entertainment', 'US'], ['KaiCenat', 'entertainment', 'US'],
  ['ryan', 'entertainment', 'US'], ['airrack', 'entertainment', 'US'], ['ZachKing', 'entertainment', 'US'],
  ['BrentRivera', 'entertainment', 'US'], ['JordanMatter', 'entertainment', 'US'], ['stokestwins', 'entertainment', 'US'],
  ['TopperGuild', 'entertainment', 'US'], ['alanchikinchow', 'entertainment', 'US'],
  ['DharMann', 'entertainment', 'US'], ['GoodMythicalMorning', 'entertainment', 'US'], ['DavidDobrik', 'entertainment', 'US'],
  ['jamescharles', 'entertainment', 'US'], ['TheEllenShow', 'entertainment', 'US'], ['JimmyKimmelLive', 'entertainment', 'US'],
  ['fallontonight', 'entertainment', 'US'], ['SaturdayNightLive', 'entertainment', 'US'], ['A4a4a4a4', 'entertainment', 'RU'],
  ['SlivkiShow', 'entertainment', 'RU'], ['felipeneto', 'entertainment', 'BR'], ['VoceSabia', 'entertainment', 'BR'],
  ['GatoGalactico', 'entertainment', 'BR'], ['luisitocomunica', 'entertainment', 'MX'], ['BadabunOficial', 'entertainment', 'MX'],
  ['yuya', 'entertainment', 'MX'], ['KimberlyLoaiza', 'entertainment', 'MX'], ['FedeVigevani', 'entertainment', 'AR'],
  ['MisPastelitos', 'entertainment', 'MX'], ['LosPolinesios', 'entertainment', 'MX'],
  ['IbaiLlanos', 'entertainment', 'ES'], ['HolaSoyGerman', 'entertainment', 'CL'], ['HajimeSyacho', 'entertainment', 'JP'],
  ['HikakinTV', 'entertainment', 'JP'], ['Fischers', 'entertainment', 'JP'], ['TokaiOnAir', 'entertainment', 'JP'],
  ['junya1gou', 'entertainment', 'JP'], ['AttaHalilintar', 'entertainment', 'ID'],
  ['RANSEntertainment', 'entertainment', 'ID'], ['corbuzier', 'entertainment', 'ID'],
  ['TRANS7OFFICIAL', 'entertainment', 'ID'], ['ABSCBNEntertainment', 'entertainment', 'PH'], ['gmanetwork', 'entertainment', 'PH'],
  ['IvanaAlawi', 'entertainment', 'PH'], ['NianaGuerrero', 'entertainment', 'PH'], ['RanzKyle', 'entertainment', 'PH'],
  ['WorkpointOfficial', 'entertainment', 'TH'], ['one31official', 'entertainment', 'TH'], ['Ch3Thailand', 'entertainment', 'TH'],
  ['zbingz', 'entertainment', 'TH'], ['ARYDigitalasia', 'entertainment', 'PK'], ['HUMTV', 'entertainment', 'PK'],
  ['Sidemen', 'entertainment', 'GB'], ['MoreSidemen', 'entertainment', 'GB'], ['KSI', 'entertainment', 'GB'],
  ['Miniminter', 'entertainment', 'GB'], ['MrBean', 'entertainment', 'GB'], ['KBSWorldTV', 'entertainment', 'KR'],
  ['Zhong', 'entertainment', 'US'], ['CrazyXYZ', 'entertainment', 'IN'], ['TriggeredInsaan', 'entertainment', 'IN'],
  ['FukraInsaan', 'entertainment', 'IN'], ['CarryMinati', 'entertainment', 'IN'], ['MRINDIANHACKER', 'entertainment', 'IN'],
  ['JaidenAnimations', 'entertainment', 'US'], ['theodd1sout', 'entertainment', 'US'], ['alanbecker', 'entertainment', 'US'],

  // ── Kids ─────────────────────────────────────────────────────────────
  ['CoComelon', 'kids', 'US'], ['VladandNiki', 'kids', 'US'], ['LikeNastyaofficial', 'kids', 'US'],
  ['KidsDianaShow', 'kids', 'US'], ['RyansWorld', 'kids', 'US'],
  ['ToysAndColors', 'kids', 'US'], ['SuperSimpleSongs', 'kids', 'CA'], ['Blippi', 'kids', 'US'],
  ['LittleBabyBum', 'kids', 'GB'], ['Pinkfong', 'kids', 'KR'],
  ['Bebefinn', 'kids', 'KR'], ['ChuChuTV', 'kids', 'IN'], ['LooLooKids', 'kids', 'US'],
  ['elreinoinfantil', 'kids', 'AR'], ['galinhapintadinha', 'kids', 'BR'], ['LuccasNeto', 'kids', 'BR'],
  ['MariaClaraeJP', 'kids', 'BR'], ['MundoBita', 'kids', 'BR'], ['MashaBearEN', 'kids', 'RU'],
  ['Morphle', 'kids', 'US'], ['BabyBus', 'kids', 'CN'],
  ['PeppaPigOfficial', 'kids', 'GB'], ['LittleAngel', 'kids', 'US'],

  // ── Gaming ───────────────────────────────────────────────────────────
  ['PewDiePie', 'gaming', 'SE'], ['markiplier', 'gaming', 'US'], ['jacksepticeye', 'gaming', 'IE'],
  ['DanTDM', 'gaming', 'GB'], ['Ninja', 'gaming', 'US'], ['VanossGaming', 'gaming', 'CA'],
  ['PrestonPlayz', 'gaming', 'US'], ['dream', 'gaming', 'US'], ['Technoblade', 'gaming', 'US'],
  ['MrBeastGaming', 'gaming', 'US'], ['Kwebbelkop', 'gaming', 'NL'], ['Jelly', 'gaming', 'NL'],
  ['Mikecrack', 'gaming', 'ES'], ['TheGrefg', 'gaming', 'ES'], ['auronplay', 'gaming', 'ES'],
  ['elrubiusOMG', 'gaming', 'ES'], ['vegetta777', 'gaming', 'ES'], ['willyrex', 'gaming', 'ES'],
  ['Fernanfloo', 'gaming', 'SV'], ['JuegaGerman', 'gaming', 'CL'], ['Unspeakable', 'gaming', 'US'],
  ['Aphmau', 'gaming', 'US'], ['LankyBox', 'gaming', 'US'], ['FGTeeV', 'gaming', 'US'],
  ['PopularMMOs', 'gaming', 'US'], ['CaptainSparklez', 'gaming', 'US'], ['SSundee', 'gaming', 'US'],
  ['TechnoGamerzOfficial', 'gaming', 'IN'], ['TotalGaming093', 'gaming', 'IN'], ['Minecraft', 'gaming', 'US'],
  ['RezendeEvil', 'gaming', 'BR'], ['AuthenticGames', 'gaming', 'BR'], ['Enaldinho', 'gaming', 'BR'],
  ['JessNoLimit', 'gaming', 'ID'], ['FrostDiamond', 'gaming', 'ID'], ['DuckyBhai', 'gaming', 'PK'],
  ['PlayStation', 'gaming', 'US'], ['Fortnite', 'gaming', 'US'],

  // ── Education & science ──────────────────────────────────────────────
  ['veritasium', 'education', 'AU'], ['kurzgesagt', 'education', 'DE'], ['MarkRober', 'education', 'US'],
  ['TED', 'education', 'US'], ['TEDx', 'education', 'US'], ['Vsauce', 'education', 'US'],
  ['crashcourse', 'education', 'US'], ['NatGeo', 'education', 'US'], ['Discovery', 'education', 'US'],
  ['khanacademy', 'education', 'US'], ['BRIGHTSIDEOFFICIAL', 'education', 'CY'], ['PhysicsWallah', 'education', 'IN'],
  ['KhanGlobalStudies', 'education', 'IN'], ['SandeepSeminars', 'education', 'IN'], ['dhruvrathee', 'education', 'IN'],

  // ── How-to, food & style ─────────────────────────────────────────────
  ['5MinuteCraftsYouTube', 'howto', 'CY'], ['TroomTroom', 'howto', 'CY'], ['NishaMadhulika', 'howto', 'IN'],
  ['KabitasKitchen', 'howto', 'IN'], ['buzzfeedtasty', 'howto', 'US'], ['gordonramsay', 'howto', 'GB'],
  ['VillageCookingChannel', 'howto', 'IN'],

  // ── Comedy ───────────────────────────────────────────────────────────
  ['BBKiVines', 'comedy', 'IN'], ['ashishchanchlanivines', 'comedy', 'IN'], ['AmitBhadana', 'comedy', 'IN'],
  ['Round2hell', 'comedy', 'IN'], ['smosh', 'comedy', 'US'],
  ['portadosfundos', 'comedy', 'BR'], ['Whindersson', 'comedy', 'BR'], ['DanielLaBelle', 'comedy', 'US'],
  ['MarkAngelComedy', 'comedy', 'NG'],

  // ── Tech ─────────────────────────────────────────────────────────────
  ['mkbhd', 'tech', 'US'], ['LinusTechTips', 'tech', 'CA'], ['unboxtherapy', 'tech', 'CA'],
  ['TechnicalGuruji', 'tech', 'IN'], ['Apple', 'tech', 'US'], ['ijustine', 'tech', 'US'],
  ['Mrwhosetheboss', 'tech', 'GB'], ['TechBurner', 'tech', 'IN'],

  // ── Sports ───────────────────────────────────────────────────────────
  ['WWE', 'sports', 'US'], ['NFL', 'sports', 'US'], ['NBA', 'sports', 'US'],
  ['DudePerfect', 'sports', 'US'], ['ufc', 'sports', 'US'], ['espn', 'sports', 'US'],
  ['fcbarcelona', 'sports', 'ES'], ['realmadrid', 'sports', 'ES'], ['cristiano', 'sports', 'PT'],
  ['premierleague', 'sports', 'GB'], ['mancity', 'sports', 'GB'], ['CazeTV', 'sports', 'BR'],

  // ── Film & TV ────────────────────────────────────────────────────────
  ['Netflix', 'film', 'US'], ['marvel', 'film', 'US'], ['MOVIECLIPS', 'film', 'US'],
  ['GoldminesTelefilms', 'film', 'IN'], ['PenMovies', 'film', 'IN'], ['shemaroo', 'film', 'IN'],
  ['rajshri', 'film', 'IN'],

  // ── News ─────────────────────────────────────────────────────────────
  ['aajtak', 'news', 'IN'], ['abpnews', 'news', 'IN'], ['ZeeNews', 'news', 'IN'],
  ['IndiaTV', 'news', 'IN'], ['TV9Bharatvarsh', 'news', 'IN'], ['CNN', 'news', 'US'],
  ['BBCNews', 'news', 'GB'], ['FoxNews', 'news', 'US'], ['aljazeeraenglish', 'news', 'QA'],
];

function loadApiKey() {
  if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY;
  try {
    const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
    const line = env.split(/\r?\n/).find((l) => l.startsWith('YOUTUBE_API_KEY='));
    return line?.slice('YOUTUBE_API_KEY='.length).trim() || null;
  } catch {
    return null;
  }
}

async function resolveHandle(key, handle) {
  const url = new URL('https://www.googleapis.com/youtube/v3/channels');
  url.searchParams.set('part', 'snippet,statistics');
  url.searchParams.set('forHandle', `@${handle}`);
  url.searchParams.set('key', key);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for @${handle}`);
  const data = await res.json();
  return data.items?.[0] ?? null;
}

async function main() {
  const key = loadApiKey();
  if (!key) {
    console.error('YOUTUBE_API_KEY not found (env or .env.local).');
    process.exit(1);
  }

  const byId = new Map();
  const dropped = [];

  // Small concurrency to stay polite with the API.
  const queue = [...SEED];
  async function worker() {
    while (queue.length) {
      const [handle, category, country] = queue.shift();
      try {
        const item = await resolveHandle(key, handle);
        if (!item) {
          dropped.push(`@${handle} (not found)`);
          continue;
        }
        const subs = Number(item.statistics?.subscriberCount ?? 0);
        if (item.statistics?.hiddenSubscriberCount || subs < MIN_SUBSCRIBERS) {
          dropped.push(`@${handle} (${item.snippet?.title}: ${subs.toLocaleString()} subs)`);
          continue;
        }
        if (byId.has(item.id)) continue; // duplicate handle for same channel
        byId.set(item.id, {
          id: item.id,
          handle: (item.snippet?.customUrl ?? `@${handle}`).replace(/^@/, ''),
          category,
          country,
          title: item.snippet?.title ?? handle,
          subs,
        });
      } catch (err) {
        dropped.push(`@${handle} (${err.message})`);
      }
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));

  const channels = [...byId.values()].sort((a, b) => b.subs - a.subs);

  const body = channels
    .map(
      (c) =>
        `  { id: '${c.id}', handle: '${c.handle.replace(/'/g, "\\'")}', category: '${c.category}', country: '${c.country}' }, // ${c.title.replace(/\r?\n/g, ' ')}`,
    )
    .join('\n');

  const file = `/**
 * AUTO-GENERATED by scripts/build-ranking-seed.mjs — do not edit by hand.
 * Re-run the script to add channels or refresh IDs.
 *
 * Only IDs, handles, category and country live here. Names, avatars and
 * statistics are fetched live from the YouTube Data API at render time.
 */

import type { RankingSeedChannel } from '@/content/rankings/types';

export const rankingChannels: RankingSeedChannel[] = [
${body}
];
`;

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, file, 'utf8');

  console.log(`Wrote ${channels.length} channels to ${OUT}`);
  console.log(`Quota used: ~${SEED.length} units`);
  if (dropped.length) {
    console.log(`\nDropped ${dropped.length}:`);
    for (const d of dropped) console.log(`  - ${d}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
