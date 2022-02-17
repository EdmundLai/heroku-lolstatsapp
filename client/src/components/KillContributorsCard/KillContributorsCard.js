import React from "react";
import ChampKeys from "../../resources/ChampKeys";
import DataUtil from "../../utils/data";
import { ImgHostURL } from "../../resources/ImgHostUrl";
import "./KillContributorsCard.css";

function KillContributorsCard(props) {
  const { currGameObj, goldSwingData, isMobile } = props;

  const startingMinute = goldSwingData.startingMinute;

  // console.log(currGameObj);

  const playerTeamObj = DataUtil.getPlayerTeamObjFromCurrGameObj(currGameObj);

  const playerId = currGameObj.playerStats.participantId;

  const playerTeamId = playerTeamObj[playerId].teamId;

  // console.log(playerTeamObj);

  const currTimelineObj = DataUtil.getTimelineObjFromGameObj(
    currGameObj,
    goldSwingData
  );

  const champKillsArr = currTimelineObj.CHAMPION_KILL;

  // console.log(champKillsArr);

  const contributorsDataObj = getContributorsDataObj(
    currGameObj,
    champKillsArr,
    playerTeamObj,
    goldSwingData
  );

  // console.log(contributorsDataObj);

  const enemyTeamId = playerTeamId === 100 ? 200 : 100;

  const enemyTeamContributors = contributorsDataObj[enemyTeamId];
  const allyTeamContributors = contributorsDataObj[playerTeamId];

  const killContributorsCardType = isMobile
    ? "KillContributorsCardMobile"
    : "KillContributorsCard";
  const contributorsCardContainerType = isMobile
    ? "ContributorsCardContainerMobile"
    : "ContributorsCardContainer";
  const contributorsCardTitleType = isMobile
    ? "ContributorsCardTitleMobile"
    : "ContributorsCardTitle";

  if (
    Object.keys(enemyTeamContributors).length === 0 &&
    Object.keys(allyTeamContributors).length === 0
  ) {
    return <></>;
  }

  function createContributorsCardContainer(
    cardTitle,
    teamContributorsList,
    teamId
  ) {
    return (
      <div className={contributorsCardContainerType}>
        <div className={contributorsCardTitleType}>{cardTitle}</div>
        <div className="KillContributorContent">
          {Object.keys(teamContributorsList).map((participantId) => {
            const infoKey = `00${startingMinute}00${participantId}`;

            return (
              <KillContributorInfo
                key={infoKey}
                teamId={teamId}
                playerTeamObj={playerTeamObj}
                teamContributors={teamContributorsList}
                participantId={participantId}
                playerTeamId={playerTeamId}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const enemyContributorsCard = createContributorsCardContainer(
    "ENEMY CONTRIBUTORS",
    enemyTeamContributors,
    enemyTeamId
  );
  const allyContributorsCard = createContributorsCardContainer(
    "ALLY CONTRIBUTORS",
    allyTeamContributors,
    playerTeamId
  );

  return (
    <div className={killContributorsCardType}>
      {enemyContributorsCard}
      {allyContributorsCard}
    </div>
  );
}

function KillContributorInfo(props) {
  const {
    teamId,
    playerTeamObj,
    teamContributors,
    participantId,
    playerTeamId,
    isMobile,
  } = props;

  const playerDataObj = teamContributors[participantId];

  // console.log(playerDataObj);

  const championId = playerTeamObj[participantId].championId;

  const survivedStatus = playerDataObj.survived ? "SURVIVED" : "DIED";

  const survivedClassText = playerDataObj.survived
    ? "SurvivedPlayerText"
    : "KilledPlayerText";

  const championNameTextType =
    teamId === playerTeamId ? "AllyTeamText" : "EnemyTeamText";

  const champion = ChampKeys[championId];

  var champName = "Not found";

  if (champion !== undefined) {
    champName = champion.match(/[A-Z][a-z]+/g).join(" ");
  }

  // mobile classes
  const contributorKillImgType = isMobile
    ? "ContributorKillImgMobile"
    : "ContributorKillImg";
  const killContributorInfoType = isMobile
    ? "KillContributorInfoMobile"
    : "KillContributorInfo";
  const contributorChampionNameType = isMobile
    ? "ContributorChampionNameMobile"
    : "ContributorChampionName";

  const championImg = showChampImgFromChampId(
    championId,
    contributorKillImgType
  );

  return (
    <div className={killContributorInfoType}>
      {championImg}
      <div className="ContributorDescription">
        <div
          className={`${contributorChampionNameType} ${championNameTextType}`}
        >
          {champName}
        </div>
        <div className="ContributorKillData">
          <div className="ContributorKillsAssists">
            {`${playerDataObj.kills} KILLS    ${playerDataObj.assists} ASSISTS`}
          </div>
          <div className={`ContributorSurvivedStatus ${survivedClassText}`}>
            {survivedStatus}
          </div>
        </div>
        <div className="ContributorGoldXPData">
          <div className="ContributorGoldData">
            <span className="ContributorGoldXPDescription">Gold Earned: </span>
            {playerDataObj.goldDelta}
          </div>
          <div className="ContributorXPData">
            <span className="ContributorGoldXPDescription">
              Experience Gained:{" "}
            </span>
            {playerDataObj.xpDelta}
          </div>
        </div>
      </div>
    </div>
  );
}

// gets the champion image from champion Id
function showChampImgFromChampId(championId, classType) {
  var champion = championId;

  if (ChampKeys.hasOwnProperty(championId)) {
    champion = ChampKeys[championId];
    return (
      <img
        className={classType}
        src={`${ImgHostURL}/champion/${champion}.png`}
        alt={champion}
      />
    );
  }

  // shows if the champion cannot be found in ChampKeys
  return <img className={classType} src="" alt={champion} />;
}

// extracting relevant contributor data for use in Kill Contributors Card
function getContributorsDataObj(
  currGameObj,
  champKillsArr,
  playerTeamObj,
  goldSwingData
) {
  const contributorsDataObj = {
    100: {},
    200: {},
  };

  // iterate through champKillsArr to add kill and death stats
  for (let i = 0; i < champKillsArr.length; i++) {
    const champKillObj = champKillsArr[i];

    const { assistingParticipantIds, killerId, victimId } = champKillObj;

    if (typeof assistingParticipantIds != "undefined") {
      for (let j = 0; j < assistingParticipantIds.length; j++) {
        const assistPlayerId = assistingParticipantIds[j];

        const assistPlayerTeamId = playerTeamObj[assistPlayerId].teamId;

        if (
          contributorsDataObj[assistPlayerTeamId].hasOwnProperty(assistPlayerId)
        ) {
          contributorsDataObj[assistPlayerTeamId][assistPlayerId].assists += 1;
        } else {
          contributorsDataObj[assistPlayerTeamId][assistPlayerId] = {
            kills: 0,
            assists: 1,
            survived: true,
            goldDelta: 0,
            xpDelta: 0,
          };
        }
      }
    }

    if (playerTeamObj.hasOwnProperty(killerId)) {
      const killerTeamId = playerTeamObj[killerId].teamId;

      if (contributorsDataObj[killerTeamId].hasOwnProperty(killerId)) {
        contributorsDataObj[killerTeamId][killerId].kills += 1;
      } else {
        contributorsDataObj[killerTeamId][killerId] = {
          kills: 1,
          assists: 0,
          survived: true,
          goldDelta: 0,
          xpDelta: 0,
        };
      }
    }

    const victimTeamId = playerTeamObj[victimId].teamId;

    if (contributorsDataObj[victimTeamId].hasOwnProperty(victimId)) {
      contributorsDataObj[victimTeamId][victimId].survived = false;
    } else {
      contributorsDataObj[victimTeamId][victimId] = {
        kills: 0,
        assists: 0,
        survived: false,
        goldDelta: 0,
        xpDelta: 0,
      };
    }
  }

  const startingMinute = goldSwingData.startingMinute;

  // adding gold and xp deltas of 1 min intervals to contributorsDataObj
  for (const teamId in contributorsDataObj) {
    const teamObj = contributorsDataObj[teamId];
    for (const participantId in teamObj) {
      // console.log(participantId);
      const { xpDelta, goldDelta } = getGoldAndExpDiffForParticipantId(
        currGameObj,
        participantId,
        startingMinute
      );

      teamObj[participantId].xpDelta = xpDelta;
      teamObj[participantId].goldDelta = goldDelta;
    }
  }

  return contributorsDataObj;
}

function getGoldAndExpDiffForParticipantId(
  currGameObj,
  participantId,
  startingMinute
) {
  const timelineData = currGameObj.timelineData;

  const endingMinute = startingMinute + 1;

  const startingFrame = getParticipantFrameObj(
    timelineData.frames[startingMinute].participantFrames,
    participantId
  );
  const endingFrame = getParticipantFrameObj(
    timelineData.frames[endingMinute].participantFrames,
    participantId
  );

  return {
    xpDelta: endingFrame.xp - startingFrame.xp,
    goldDelta: endingFrame.totalGold - startingFrame.totalGold,
  };
}

// get participantFrameObj corresponding to participantId from participantFrames at particular minute
function getParticipantFrameObj(participantFrames, participantId) {
  const frameKeys = Object.keys(participantFrames);

  for (let frameIndex = 0; frameIndex < frameKeys.length; frameIndex++) {
    const frameKey = frameKeys[frameIndex];

    const participantFrameObj = participantFrames[frameKey];

    if (participantFrameObj.participantId === parseInt(participantId)) {
      return participantFrameObj;
    }
  }
}

export default KillContributorsCard;
