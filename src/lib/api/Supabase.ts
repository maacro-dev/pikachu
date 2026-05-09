
import { getAll, getSlugs, getBySlug, getFilters } from "./district.api";

import {
  getAll as getAllMunicipalities,
  getAllByDistrictId,
  getBySlug as getMunicipalityBySlug,
  getSlugs as getMunicipalitySlugs
}
  from "./municipality.api";

import { getAllByMunicipalityId as getAttractionsByMunicipalityId, getAll as getAllAttractions, getFeatured as getFeaturedAttractions }
  from "./attraction.api";

import { getAllByMunicipalityId as getFoodsByMunicipalityId, getAll as getAllFoods }
  from "./food.api";

import {
  getAll as getAllFestivals,
  getAllByMunicipalityId as getFestivalsByMunicipalityId
}
  from "./festival.api";

import { getAllByMunicipalityId as getEventsByMunicipalityId, getAll as getAllEvents, getFeatured as getFeaturedEvents }
  from "./events.api";

export const SupabaseAPI = {
  districts: {
    getAll,
    getSlugs,
    getBySlug,
    getFilters
  },

  municipalities: {
    getAll: getAllMunicipalities,
    getAllByDistrictId,
    getBySlug: getMunicipalityBySlug,
    getSlugs: getMunicipalitySlugs
  },

  attractions: {
    getAllByMunicipalityId: getAttractionsByMunicipalityId,
    getAll: getAllAttractions,
    getFeatured: getFeaturedAttractions
  },
  foods: {
    getAllByMunicipalityId: getFoodsByMunicipalityId,
    getAll: getAllFoods
  },

  festivals: {
    getAll: getAllFestivals,
    getAllByMunicipalityId: getFestivalsByMunicipalityId
  },

  events: {
    getAllByMunicipalityId: getEventsByMunicipalityId,
    getAll: getAllEvents,
    getFeatured: getFeaturedEvents
  },
};
