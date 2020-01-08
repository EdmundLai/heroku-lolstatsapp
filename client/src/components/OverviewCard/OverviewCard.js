import React from 'react';
import TimeUtil from '../../utils/time';
import ChampKeys from '../../resources/ChampKeys';
import ImgHostURL from '../../resources/ImgHostUrl';
import './OverviewCard.css';

class OverviewCard extends React.Component {
  render() {
    const overviewObj = getOverviewObj(this.props.currGameObj);

    // console.log(overviewObj);

    return(
      <div className="OverviewCard">
        <OverviewHeader overviewObj={overviewObj} />
        <StatsGrid overviewObj={overviewObj} />

      </div>
    );
  }
}

class StatsGrid extends React.Component {
  render() {
    const overviewObj = this.props.overviewObj;

    // console.log(overviewObj);

    return(
      <div className="StatsGrid">
        <div className="AllyTeamStats">
          {overviewObj.allyTeam.participantStats.map(playerStats => {
            return(
              <PlayerStatsContainer key={playerStats.summonerName} playerStats={playerStats} 
              maxDamage={overviewObj.maxDamageToChampions} currPlayerId={overviewObj.currPlayerId} type="ally"/>
            );
          }
          )}
        </div>
        <div className="EnemyTeamStats">
          {overviewObj.enemyTeam.participantStats.map(playerStats => {
            return(
              <PlayerStatsContainer key={playerStats.summonerName} playerStats={playerStats} 
              maxDamage={overviewObj.maxDamageToChampions} currPlayerId={overviewObj.currPlayerId} type="enemy"/>
            );
          }
          )}
        </div>
      </div>
    );
  }
}

class PlayerStatsContainer extends React.Component {
  render() {
    const playerStats = this.props.playerStats;
    const championID = playerStats.championId;

    const currPlayerId = this.props.currPlayerId;

    // console.log(playerStats);

    let champion = championID;

    let playerClassImg = "";

    if(currPlayerId === playerStats.participantId) {
      playerClassImg = "CurrentPlayerImg";
    }

    if(ChampKeys.hasOwnProperty(championID)) {
      champion = ChampKeys[championID];
    }

    let containerType = "AllyContainer";
    let detailsType = "AllyDetails";
    let imageType = "AllyImage";
    let damageType = "AllyDamage";
    let damageBarType = "AllyDamageBar";
    let descriptionType = "AllyDamageDescription";

    if(this.props.type === "enemy") {
      containerType = "EnemyContainer";
      detailsType  = "EnemyDetails";
      imageType = "EnemyImage";
      damageType = "EnemyDamage";
      damageBarType = "EnemyDamageBar";
      descriptionType = "EnemyDamageDescription";
    }

    const damageBarLength = playerStats.totalDamageDealtToChampions / this.props.maxDamage * 300;
    const barLengthInPx = damageBarLength + "px";
    const damageStyle = {
      width: barLengthInPx
    }
    if(damageBarLength === 0) {
      damageStyle["backgroundColor"] = "transparent";
    }
    const champImg = <img className={`StatsImage ${imageType} ${playerClassImg}`} src={`${ImgHostURL}/champion/${champion}.png`} alt={champion} />;

    return(
      <div className={`PlayerStatsContainer ${containerType}`}>
        {champImg}
        <div className={`PlayerStatsDetails ${detailsType}`}>
          <div className="StatsSummonerName">
            {playerStats.summonerName}
          </div>
          <div className="StatsKDA">
            {`${playerStats.kills} / ${playerStats.deaths} / ${playerStats.assists}`}
          </div>
          <div className={`StatsChampionDamage ${damageType}`}>
            <div className={`DamageDescription ${descriptionType}`}>
              Damage
            </div>
            <div className="DamageValue">
              <div className={`DamageBar ${damageBarType}`} style={damageStyle}>
                {playerStats.totalDamageDealtToChampions}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function OverviewHeader(props) {
  const overviewObj = props.overviewObj;

  let GameResult = "LOSS";
  let resultClass = "BadResult";

  if(overviewObj.win) {
    GameResult = "WIN";
    resultClass = "GoodResult";
  }

  return(
    <div className="OverviewHeader">
      <div className="TimeSection">
        {overviewObj.timeString}
      </div>
      <div className="ScoreSection">
        <div className="AllyKills">
          {overviewObj.allyTeam.kills}
        </div>
        <div className={`GameResult ${resultClass}`}>
          {GameResult}
        </div>
        <div className="EnemyKills">
          {overviewObj.enemyTeam.kills}
        </div>
      </div>
      <div className="TeamHeadings">
        <div className="AllyHeading">
          YOUR TEAM
        </div>
        <div className="EnemyHeading">
          ENEMY TEAM
        </div>
      </div>
    </div>
  );
}

function getOverviewObj(currGameObj) {
  const timeString = TimeUtil.convertLengthToTimeString(currGameObj.gameLength);
  const gameStats = currGameObj.gameStats;
  const win = currGameObj.playerStats.win;
  const allyTeam = {
    teamId: null,
    kills: 0,
    participantStats: [],
  };
  const enemyTeam = {
    teamId: null,
    kills: 0,
    participantStats: [],
  };

  // will return array of length 1
  const participantArray = gameStats.participants;
  const currPlayerId = currGameObj.playerStats.participantId;
  const currParticipantObj = participantArray.filter(participantObj => participantObj.participantId === currPlayerId)[0];
  // console.log("currParticipantObj");
  // console.log(currParticipantObj);
  allyTeam.teamId = currParticipantObj.teamId;

  if(allyTeam.teamId === 100) {
    enemyTeam.teamId = 200;
  } else {
    enemyTeam.teamId = 100;
  }

  let maxDamageToChampions = 0;

  for(let i = 0; i < participantArray.length; i++) {
    const participantObj = participantArray[i];

    const participantId = participantObj.participantId;
    const teamId = participantObj.teamId;
    const stats = participantObj.stats;

    const currIdentityObj = gameStats.participantIdentities.filter(identityObj => identityObj.participantId === participantId)[0];
    const summonerName = currIdentityObj.player.summonerName;

    const championId = participantObj.championId;

    const kills = stats.kills;
    const deaths = stats.deaths;
    const assists = stats.assists;
    const totalDamageDealtToChampions = stats.totalDamageDealtToChampions;

    if(totalDamageDealtToChampions > maxDamageToChampions) {
      maxDamageToChampions = totalDamageDealtToChampions;
    }

    const playerStatsObj = {
      participantId,
      summonerName,
      championId,
      kills,
      deaths,
      assists,
      totalDamageDealtToChampions,
    };

    if(teamId === allyTeam.teamId) {
      allyTeam.kills = allyTeam.kills + kills;
      allyTeam.participantStats.push(playerStatsObj);
    } else {
      enemyTeam.kills = enemyTeam.kills + kills;
      enemyTeam.participantStats.push(playerStatsObj);
    }
  }

  const OverviewObj = {
    currPlayerId,
    timeString,
    win,
    allyTeam,
    enemyTeam,
    maxDamageToChampions,
  };

  return OverviewObj;
}

export default OverviewCard;