// @flow

type VMSEpisodeID = number;
type VMSClipID = number;
type VMSTvSeriesID = number;
type VMSChannelID = number;
type LVGListingID = number;

type CMSTvSeriesRailID = string;
type CMSClipRailID = string;
type CMSEpisodeRailID = string;

type CMSItemID = string;

type VMSEpisode = { id: VMSEpisodeID, episodeDisplayName: string };
type VMSClip = { clipDisplayName: string };
type VMSTvSeries = { tvSeriesDisplayName: string, clipIds: Array<VMSClipID>, episodeIds: Array<VMSEpisodeID> };
type LVGListing = { listingDisplayName: string };
type VMSChannel = { channelDisplayName: string, listingsIds: Array<LVGListingID> };

type CMSTvSeriesRail = { tvSeriesIds: Array<VMSTvSeriesID> };
type CMSClipRail = { clipIds: Array<VMSClipID> };
type CMSEpisodeRail = { episodeIds: Array<VMSEpisodeID> };
type CMSHomePage = { rails: Array<{ type: 'episodeRail', rail: CMSEpisodeRailID }> };

/**
 * This object represents a collection of every resources.
 * It is used to determine which resources have discovered during a response,
 * to avoid re-fetching them. Once the Fetch pass have been completed,
 * this object will be passed to the formatter to be composed into a response.
 */
type ResourcePool = {
  vmsEpisodes: Map<VMSEpisodeID, VMSEpisode>,
  vmsClips: Map<VMSClipID, VMSClip>,
  vmsTvSeries: Map<VMSTvSeriesID, VMSTvSeries>,
  vmsChannel: Map<VMSChannelID, VMSChannel>,
  lvgListing: Map<LVGListingID, LVGListing>,
  cmsTvSeriesRails: Map<CMSItemID, CMSTvSeriesRail>,
  cmsClipRails: Map<CMSItemID, CMSClipRail>,
  cmsEpisodeRails: Map<CMSItemID, CMSEpisodeRail>,
  cmsHomePages: Map<CMSItemID, CMSHomePage>,
};

export const EMPTY_RESOURCE_POOL: ResourcePool = {
  vmsEpisodes: new Map(),
  vmsClips: new Map(),
  vmsTvSeries: new Map(),
  vmsChannel: new Map(),
  lvgListing: new Map(),
  cmsTvSeriesRails: new Map(),
  cmsClipRails: new Map(),
  cmsEpisodeRails: new Map(),
  cmsHomePages: new Map(),
};

const insertVmsEpisodesToPool = (pool: ResourcePool, episodesToInsert: Array<VMSEpisode>): ResourcePool => {
  const newEpisodes = new Map(pool.vmsEpisodes);
  episodesToInsert.forEach(episode => newEpisodes.set(episode.id, episode));

  return {
    ...pool,
    episodes: newEpisodes,
  };
};

const fetchEpisode = async (pool: ResourcePool, episodeId: VMSEpisodeID) => {
  const newPool = insertVmsEpisodesToPool(pool, await vmsApiClient.getEpisodeById(episodeId));
  return newPool;
};

const episodeRail = async (pool: ResourcePool, episodeRailId: CMSRailID) => {
  const itemResponse = await cmsApiClient.getItem(episodeRailId);
  if (itemResponse.templateId !== vodRailTemplateId) {
    return;
  }
  // there is an aspect of uncertainty
};