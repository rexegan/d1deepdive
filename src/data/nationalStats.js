// Which ESPN stat columns the National Stats tab shows, grouped into tabs.
//
// Football player tabs name the ESPN category to request (category); the
// feed leaves every other category blank.
//
// Player columns are keyed '<espn category>.<stat name>' (byathlete feed).
// Team columns are keyed 'own.<category>.<stat>' or 'opp.<category>.<stat>'
// (byteam lists each category twice: the team's own numbers, then its
// opponents'). low: true means a smaller number ranks higher.
//
// Basketball's player feed ignores ESPN's "qualified" filter and lets
// one-game players from non-D1 schools top every per-game list, so each
// basketball column names the season-total stat to pull the pool by (fetch)
// and, for percentages, a per-game minimum (min) like the NCAA's own.
// sk overrides the server sort key where ESPN spells it differently
// (defensiveInterceptions). noSort columns can't be ranked by ESPN.

const c = (k, l, t, extra) => ({ k, l, t, ...extra })

const FB_PLAYERS = [
  {
    id: 'passing',
    category: 'offense:passing',
    label: 'Passing',
    sort: 'passing.passingYards',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('passing.completions', 'CMP', 'Completions'),
      c('passing.passingAttempts', 'ATT', 'Pass attempts'),
      c('passing.completionPct', 'CMP%', 'Completion percentage'),
      c('passing.passingYards', 'YDS', 'Passing yards'),
      c('passing.passingYardsPerGame', 'YDS/G', 'Passing yards per game'),
      c('passing.yardsPerPassAttempt', 'AVG', 'Yards per attempt'),
      c('passing.passingTouchdowns', 'TD', 'Passing touchdowns'),
      c('passing.interceptions', 'INT', 'Interceptions thrown'),
      c('passing.longPassing', 'LNG', 'Longest pass'),
      c('passing.sacks', 'SACK', 'Times sacked'),
      c('passing.QBR', 'QBR', 'ESPN Total QBR'),
      c('passing.QBRating', 'RTG', 'Passer rating'),
    ],
  },
  {
    id: 'rushing',
    category: 'offense:rushing',
    label: 'Rushing',
    sort: 'rushing.rushingYards',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('rushing.rushingAttempts', 'CAR', 'Carries'),
      c('rushing.rushingYards', 'YDS', 'Rushing yards'),
      c('rushing.rushingYardsPerGame', 'YDS/G', 'Rushing yards per game'),
      c('rushing.yardsPerRushAttempt', 'AVG', 'Yards per carry'),
      c('rushing.rushingTouchdowns', 'TD', 'Rushing touchdowns'),
      c('rushing.longRushing', 'LNG', 'Longest run'),
      c('rushing.rushingFirstDowns', 'FD', 'Rushing first downs'),
      c('rushing.rushingFumblesLost', 'LST', 'Fumbles lost'),
    ],
  },
  {
    id: 'receiving',
    category: 'offense:receiving',
    label: 'Receiving',
    sort: 'receiving.receivingYards',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('receiving.receptions', 'REC', 'Receptions'),
      c('receiving.receivingYards', 'YDS', 'Receiving yards'),
      c('receiving.receivingYardsPerGame', 'YDS/G', 'Receiving yards per game'),
      c('receiving.yardsPerReception', 'AVG', 'Yards per catch'),
      c('receiving.receivingTouchdowns', 'TD', 'Receiving touchdowns'),
      c('receiving.longReception', 'LNG', 'Longest catch'),
      c('receiving.receivingBigPlays', 'BIG', '20+ yard catches'),
      c('receiving.receivingYardsAfterCatch', 'YAC', 'Yards after catch'),
      c('receiving.receivingFirstDowns', 'FD', 'Receiving first downs'),
    ],
  },
  {
    id: 'defense',
    category: 'defense',
    label: 'Defense',
    sort: 'defensive.totalTackles',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('defensive.totalTackles', 'TOT', 'Total tackles'),
      c('defensive.soloTackles', 'SOLO', 'Solo tackles'),
      c('defensive.assistTackles', 'AST', 'Assisted tackles'),
      c('defensive.sacks', 'SACK', 'Sacks'),
      c('defensive.tacklesForLoss', 'TFL', 'Tackles for loss'),
      c('defensive.passesDefended', 'PD', 'Passes defended'),
      c('defensiveinterceptions.interceptions', 'INT', 'Interceptions', { sk: 'defensiveInterceptions.interceptions' }),
      c('defensiveinterceptions.interceptionYards', 'INT YDS', 'Interception return yards', {
        sk: 'defensiveInterceptions.interceptionYards',
      }),
      c('defensiveinterceptions.interceptionTouchdowns', 'INT TD', 'Pick-sixes', {
        sk: 'defensiveInterceptions.interceptionTouchdowns',
      }),
      c('general.fumblesForced', 'FF', 'Forced fumbles', { noSort: true }),
      c('general.fumblesRecovered', 'FR', 'Fumbles recovered', { noSort: true }),
    ],
  },
  {
    id: 'scoring',
    category: 'scoring',
    label: 'Scoring',
    sort: 'scoring.totalPoints',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('scoring.totalPoints', 'PTS', 'Total points'),
      c('scoring.totalPointsPerGame', 'PTS/G', 'Points per game'),
      c('scoring.totalTouchdowns', 'TD', 'Total touchdowns'),
      c('scoring.rushingTouchdowns', 'RUSH', 'Rushing touchdowns'),
      c('scoring.receivingTouchdowns', 'REC', 'Receiving touchdowns'),
      c('scoring.returnTouchdowns', 'RET', 'Return touchdowns'),
      c('scoring.fieldGoals', 'FG', 'Field goals'),
      c('scoring.kickExtraPoints', 'PAT', 'Extra points'),
      c('scoring.totalTwoPointConvs', '2PT', 'Two-point conversions'),
    ],
  },
  {
    id: 'kicking',
    category: 'specialTeams:kicking',
    label: 'Kicking',
    sort: 'kicking.fieldGoalsMade',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('kicking.fieldGoalsMade', 'FGM', 'Field goals made'),
      c('kicking.fieldGoalAttempts', 'FGA', 'Field goal attempts'),
      c('kicking.fieldGoalPct', 'FG%', 'Field goal percentage'),
      c('kicking.longFieldGoalMade', 'LNG', 'Longest field goal'),
      c('kicking.fieldGoalsMade40_49', '40-49', 'Made from 40-49 yards'),
      c('kicking.fieldGoalsMade50', '50+', 'Made from 50+ yards'),
      c('kicking.extraPointsMade', 'XPM', 'Extra points made'),
      c('kicking.extraPointAttempts', 'XPA', 'Extra point attempts'),
      c('kicking.extraPointPct', 'XP%', 'Extra point percentage'),
    ],
  },
  {
    id: 'punting',
    category: 'specialTeams:punting',
    label: 'Punting',
    sort: 'punting.grossAvgPuntYards',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('punting.punts', 'PUNTS', 'Punts'),
      c('punting.puntYards', 'YDS', 'Punt yards'),
      c('punting.grossAvgPuntYards', 'AVG', 'Gross average'),
      c('punting.netAvgPuntYards', 'NET', 'Net average'),
      c('punting.longPunt', 'LNG', 'Longest punt'),
      c('punting.puntsInside20', 'IN20', 'Inside the 20'),
      c('punting.touchbacks', 'TB', 'Touchbacks'),
      c('punting.fairCatches', 'FC', 'Fair catches'),
    ],
  },
  {
    id: 'returns',
    category: 'specialTeams:returning',
    label: 'Returns',
    sort: 'returning.kickReturnYards',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('returning.kickReturns', 'KR', 'Kick returns'),
      c('returning.kickReturnYards', 'KR YDS', 'Kick return yards'),
      c('returning.yardsPerKickReturn', 'KR AVG', 'Yards per kick return'),
      c('returning.kickReturnTouchdowns', 'KR TD', 'Kick return touchdowns'),
      c('returning.puntReturns', 'PR', 'Punt returns'),
      c('returning.puntReturnYards', 'PR YDS', 'Punt return yards'),
      c('returning.yardsPerPuntReturn', 'PR AVG', 'Yards per punt return'),
      c('returning.puntReturnTouchdowns', 'PR TD', 'Punt return touchdowns'),
      c('returning.longKickReturn', 'LNG KR', 'Longest kick return'),
      c('returning.longPuntReturn', 'LNG PR', 'Longest punt return'),
    ],
  },
]

const FB_TEAMS = [
  {
    id: 'offense',
    label: 'Offense',
    sort: 'own.passing.totalPointsPerGame',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('own.passing.totalPointsPerGame', 'PPG', 'Points per game'),
      c('own.passing.totalPoints', 'PTS', 'Total points'),
      c('own.passing.yardsPerGame', 'YDS/G', 'Total yards per game'),
      c('own.passing.totalYards', 'YDS', 'Total yards'),
      c('own.passing.passingYardsPerGame', 'PASS/G', 'Passing yards per game'),
      c('own.rushing.rushingYardsPerGame', 'RUSH/G', 'Rushing yards per game'),
      c('own.passing.yardsPerPassAttempt', 'YPA', 'Yards per pass attempt'),
      c('own.rushing.yardsPerRushAttempt', 'YPC', 'Yards per carry'),
      c('own.passing.completionPct', 'CMP%', 'Completion percentage'),
      c('own.passing.passingTouchdowns', 'PASS TD', 'Passing touchdowns'),
      c('own.rushing.rushingTouchdowns', 'RUSH TD', 'Rushing touchdowns'),
      c('own.passing.interceptions', 'INT', 'Interceptions thrown', { low: true }),
      c('own.passing.sacks', 'SCK', 'Sacks allowed', { low: true }),
    ],
  },
  {
    id: 'defense',
    label: 'Defense',
    sort: 'opp.passing.totalPointsPerGame',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('opp.passing.totalPointsPerGame', 'PA/G', 'Points allowed per game', { low: true }),
      c('opp.passing.yardsPerGame', 'YDS/G', 'Yards allowed per game', { low: true }),
      c('opp.passing.passingYardsPerGame', 'PASS/G', 'Passing yards allowed per game', { low: true }),
      c('opp.rushing.rushingYardsPerGame', 'RUSH/G', 'Rushing yards allowed per game', { low: true }),
      c('opp.passing.yardsPerPassAttempt', 'YPA', 'Yards per pass attempt allowed', { low: true }),
      c('opp.rushing.yardsPerRushAttempt', 'YPC', 'Yards per carry allowed', { low: true }),
      c('opp.passing.completionPct', 'CMP%', 'Opponent completion percentage', { low: true }),
      c('opp.passing.sacks', 'SACK', 'Sacks'),
      c('opp.passing.interceptions', 'INT', 'Interceptions'),
      c('own.general.fumblesRecovered', 'FR', 'Fumbles recovered'),
      c('opp.miscellaneous.thirdDownConvPct', '3RD%', 'Opponent third-down conversion %', { low: true }),
    ],
  },
  {
    id: 'special',
    label: 'Special teams',
    sort: 'own.kicking.fieldGoalPct',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('own.kicking.fieldGoalsMade', 'FGM', 'Field goals made'),
      c('own.kicking.fieldGoalAttempts', 'FGA', 'Field goal attempts'),
      c('own.kicking.fieldGoalPct', 'FG%', 'Field goal percentage'),
      c('own.kicking.longFieldGoalMade', 'LNG', 'Longest field goal'),
      c('own.kicking.extraPointPct', 'XP%', 'Extra point percentage'),
      c('own.punting.grossAvgPuntYards', 'PUNT', 'Gross punting average'),
      c('own.punting.netAvgPuntYards', 'NET', 'Net punting average'),
      c('own.returning.yardsPerKickReturn', 'KR AVG', 'Yards per kick return'),
      c('own.returning.yardsPerPuntReturn', 'PR AVG', 'Yards per punt return'),
      c('own.returning.kickReturnTouchdowns', 'KR TD', 'Kick return touchdowns'),
      c('own.returning.puntReturnTouchdowns', 'PR TD', 'Punt return touchdowns'),
    ],
  },
  {
    id: 'downs',
    label: 'Downs & penalties',
    sort: 'own.miscellaneous.thirdDownConvPct',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('own.miscellaneous.thirdDownConvPct', '3RD%', 'Third-down conversion %'),
      c('own.miscellaneous.thirdDownConvs', '3RD', 'Third downs converted'),
      c('own.miscellaneous.fourthDownConvPct', '4TH%', 'Fourth-down conversion %'),
      c('own.miscellaneous.fourthDownConvs', '4TH', 'Fourth downs converted'),
      c('own.miscellaneous.firstDowns', '1ST', 'First downs'),
      c('own.miscellaneous.firstDownsRushing', '1ST RUSH', 'Rushing first downs'),
      c('own.miscellaneous.firstDownsPassing', '1ST PASS', 'Passing first downs'),
      c('own.miscellaneous.totalPenalties', 'PEN', 'Penalties', { low: true }),
      c('own.miscellaneous.totalPenaltyYards', 'PEN YDS', 'Penalty yards', { low: true }),
    ],
  },
]

const BB_PLAYERS = [
  {
    id: 'scoring',
    label: 'Scoring',
    sort: 'offensive.avgPoints',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('general.avgMinutes', 'MIN', 'Minutes per game', { fetch: 'general.minutes' }),
      c('offensive.avgPoints', 'PPG', 'Points per game', { fetch: 'offensive.points' }),
      c('offensive.points', 'PTS', 'Total points'),
      c('offensive.avgFieldGoalsMade', 'FGM', 'Field goals made per game', { fetch: 'offensive.fieldGoalsMade' }),
      c('offensive.avgFieldGoalsAttempted', 'FGA', 'Field goal attempts per game', {
        fetch: 'offensive.fieldGoalsAttempted',
      }),
      c('offensive.fieldGoalPct', 'FG%', 'Field goal percentage (min. 5 made per game)', {
        fetch: 'offensive.fieldGoalsMade',
        min: ['offensive.avgFieldGoalsMade', 5],
      }),
      c('offensive.avgThreePointFieldGoalsMade', '3PM', '3-pointers made per game', {
        fetch: 'offensive.threePointFieldGoalsMade',
      }),
      c('offensive.avgThreePointFieldGoalsAttempted', '3PA', '3-point attempts per game', {
        fetch: 'offensive.threePointFieldGoalsAttempted',
      }),
      c('offensive.threePointFieldGoalPct', '3P%', '3-point percentage (min. 2 made per game)', {
        fetch: 'offensive.threePointFieldGoalsMade',
        min: ['offensive.avgThreePointFieldGoalsMade', 2],
      }),
      c('offensive.avgFreeThrowsMade', 'FTM', 'Free throws made per game', { fetch: 'offensive.freeThrowsMade' }),
      c('offensive.freeThrowPct', 'FT%', 'Free throw percentage (min. 2.5 made per game)', {
        fetch: 'offensive.freeThrowsMade',
        min: ['offensive.avgFreeThrowsMade', 2.5],
      }),
    ],
  },
  {
    id: 'boards',
    label: 'Rebounds & assists',
    sort: 'general.avgRebounds',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('general.avgMinutes', 'MIN', 'Minutes per game', { fetch: 'general.minutes' }),
      c('general.avgRebounds', 'RPG', 'Rebounds per game', { fetch: 'general.rebounds' }),
      c('general.rebounds', 'REB', 'Total rebounds'),
      c('offensive.avgAssists', 'APG', 'Assists per game', { fetch: 'offensive.assists' }),
      c('offensive.assists', 'AST', 'Total assists'),
      c('offensive.avgTurnovers', 'TO', 'Turnovers per game', { fetch: 'offensive.turnovers' }),
      c('general.doubleDouble', 'DD', 'Double-doubles'),
      c('general.tripleDouble', 'TD', 'Triple-doubles'),
      c('general.PER', 'PER', 'Player efficiency rating', { fetch: 'general.minutes' }),
    ],
  },
  {
    id: 'defense',
    label: 'Defense',
    sort: 'defensive.avgSteals',
    cols: [
      c('general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('general.avgMinutes', 'MIN', 'Minutes per game', { fetch: 'general.minutes' }),
      c('defensive.avgSteals', 'SPG', 'Steals per game', { fetch: 'defensive.steals' }),
      c('defensive.steals', 'STL', 'Total steals'),
      c('defensive.avgBlocks', 'BPG', 'Blocks per game', { fetch: 'defensive.blocks' }),
      c('defensive.blocks', 'BLK', 'Total blocks'),
      c('general.avgFouls', 'PF', 'Fouls per game', { fetch: 'general.fouls', low: true }),
    ],
  },
]

const BB_TEAMS = [
  {
    id: 'offense',
    label: 'Offense',
    sort: 'own.offensive.avgPoints',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('own.offensive.avgPoints', 'PPG', 'Points per game'),
      c('own.offensive.fieldGoalPct', 'FG%', 'Field goal percentage'),
      c('own.offensive.threePointFieldGoalPct', '3P%', '3-point percentage'),
      c('own.offensive.freeThrowPct', 'FT%', 'Free throw percentage'),
      c('own.offensive.avgThreePointFieldGoalsMade', '3PM', '3-pointers made per game'),
      c('own.offensive.avgAssists', 'APG', 'Assists per game'),
      c('own.offensive.avgTurnovers', 'TO', 'Turnovers per game', { low: true }),
      c('own.offensive.avgOffensiveRebounds', 'OREB', 'Offensive rebounds per game'),
      c('own.general.avgRebounds', 'RPG', 'Rebounds per game'),
      c('own.general.assistTurnoverRatio', 'A/TO', 'Assist-to-turnover ratio'),
    ],
  },
  {
    id: 'defense',
    label: 'Defense',
    sort: 'opp.offensive.avgPoints',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('opp.offensive.avgPoints', 'OPP PPG', 'Points allowed per game', { low: true }),
      c('opp.offensive.fieldGoalPct', 'OPP FG%', 'Opponent field goal percentage', { low: true }),
      c('opp.offensive.threePointFieldGoalPct', 'OPP 3P%', 'Opponent 3-point percentage', { low: true }),
      c('own.defensive.avgSteals', 'SPG', 'Steals per game'),
      c('own.defensive.avgBlocks', 'BPG', 'Blocks per game'),
      c('own.defensive.avgDefensiveRebounds', 'DREB', 'Defensive rebounds per game'),
      c('opp.offensive.avgTurnovers', 'TO FORCED', 'Turnovers forced per game'),
    ],
  },
  {
    id: 'margins',
    label: 'Margins',
    sort: 'own.differential.avgPointsDifferential',
    cols: [
      c('own.general.gamesPlayed', 'GP', 'Games played', { noSort: true }),
      c('own.differential.avgPointsDifferential', 'MARGIN', 'Scoring margin per game'),
      c('own.differential.avgReboundsDifferential', 'REB +/-', 'Rebound margin per game'),
      c('own.differential.avgTurnoversDifferential', 'TO +/-', 'Turnover margin (fewer is better)', { low: true }),
      c('own.differential.fieldGoalPctDifferential', 'FG% +/-', 'Field goal percentage margin'),
      c('own.differential.threePointFieldGoalPctDifferential', '3P% +/-', '3-point percentage margin'),
      c('own.differential.avgAssistsDifferential', 'AST +/-', 'Assist margin per game'),
    ],
  },
]

/** The stat tabs for a sport, or null when ESPN publishes no national stats for it. */
export function statTabs(sport) {
  if (sport.byWeek) return { players: FB_PLAYERS, teams: FB_TEAMS }
  if (sport.path.startsWith('basketball/')) return { players: BB_PLAYERS, teams: BB_TEAMS }
  return null
}
