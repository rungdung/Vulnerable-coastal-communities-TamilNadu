import fishersSettlement from "../../assets/settlements.geojson";
import atRiskVillages100mts from "../../assets/100mtsfromHazardLineVillages.geojson";
import CRZboundary from "../../assets/CRZboundary.geojson";
import hazardLine from "../../assets/hazardLine.geojson";
import NDZline from "../../assets/200mtsNDZline.geojson";
import erosionLine from "../../assets/erosionLine.geojson";
import tamilNaduBoundary from "../../assets/tamilNaduBoundary.geojson";

// To rewind to RightHand GeoJSON spec
import rewind from "@mapbox/geojson-rewind";

let fisherSettlementCleaned = rewind(fishersSettlement);
let villageBoundariesCleaned = rewind(atRiskVillages100mts);

// consider https://github.com/stevage/map-gl-utils
export function loadLayers(map){
    map.addSource("fishersSettlement", {
        type: "geojson",
        data: fisherSettlementCleaned,
      });
    
      map.addSource("atRiskVillages100mts", {
        type: "geojson",
        data: villageBoundariesCleaned,
      });
    
      map.addSource("CRZboundary", {
        type: "geojson",
        data: CRZboundary,
      });
    
      map.addSource("hazardLine", {
        type: "geojson",
        data: hazardLine,
      });
    
      map.addSource("NDZline", {
        type: "geojson",
        data: NDZline,
      });
    
      map.addSource("DEM80cm", {
        type: "image",
        url: "./assets/80cmAMSL.png",
        coordinates: [
          [77.08902767630629, 8.072916016221772],
          [80.3543062603006, 8.072916016221772],
          [80.3543062603006, 13.580695017916167],
          [77.08902767630629, 13.580695017916167],
        ],
      });
    
      map.addSource("DEM150cm", {
        type: "image",
        url: "./assets/150cmAMSL.png",
        coordinates: [
          [77.08902767630629, 8.072916016221772],
          [80.3543062603006, 8.072916016221772],
          [80.3543062603006, 13.580695017916167],
          [77.08902767630629, 13.580695017916167],
        ],
      });

      map.addSource("tamilNaduBoundary", {
        type: "geojson",
        data: tamilNaduBoundary,
      })

      map.addSource("erosionLine", {
        type: "geojson",
        data: erosionLine
      });
    
      map.addLayer({
        id: "fishersSettlement",
        type: "fill",
        source: "fishersSettlement",
        paint: {
          "fill-color": "red",
          "fill-opacity": 1,
        },
      });
    
      map.addLayer({
        id: "atRiskVillages100mts",
        type: "fill",
        source: "atRiskVillages100mts",
        paint: {
          "fill-color": [
            "let",
            "density",
            ["/", ["get", "tot_p"], ["get", "area"]],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              [
                "interpolate",
                ["linear"],
                ["var", "density"],
                274,
                ["to-color", "#edf8e9"],
                1551,
                ["to-color", "#006d2c"],
              ],
              10,
              [
                "interpolate",
                ["linear"],
                ["var", "density"],
                274,
                ["to-color", "#eff3ff"],
                1551,
                ["to-color", "#08519c"],
              ],
            ],
          ],
          "fill-opacity": 0.7,
        },
      });
    
      map.addLayer({
        id: "atRiskVillage100mtsLine",
        type: "line",
        source: "atRiskVillages100mts",
        paint: {
          "line-color": "black",
          "line-width": 1,
          "line-opacity": 0.5,
        },
      });
      map.setLayoutProperty("atRiskVillage100mtsLine", "visibility", "none");
    
      map.addLayer({
        id: "villageText",
        type: "symbol",
        source: "atRiskVillages100mts",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });
      map.setLayoutProperty("villageText", "visibility", "none");
    
      map.addLayer({
        id: "CRZboundary",
        type: "line",
        source: "CRZboundary",
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });
      map.setLayoutProperty("CRZboundary", "visibility", "none");
    
      map.addLayer({
        id: "erosionLine",
        type: "line",
        source: "erosionLine",
        paint: {
          "line-color": "yellow",
          "line-width": 5,
        },
      });
      map.setLayoutProperty("erosionLine", "visibility", "none");

      map.addLayer({
        id: "tamilNaduBoundary",
        type: "fill",
        source: "tamilNaduBoundary",
        paint: {
          "fill-color": "#8a6837",
          "fill-opacity": 0.4,
        }})

      map.addLayer({
        id: "hazardLine",
        type: "line",
        source: "hazardLine",
        paint: {
          "line-color": "red",
          "line-width": 2,
        },
      });
      map.setLayoutProperty("hazardLine", "visibility", "none");
    
      map.addLayer({
        id: "NDZline",
        type: "line",
        source: "NDZline",
        paint: {
          "line-color": "blue",
          "line-width": 2,
        },
      });
      map.setLayoutProperty("NDZline", "visibility", "none");
    
      map.addLayer({
        id: "DEM80cm",
        type: "raster",
        source: "DEM80cm",
        paint: {
          "raster-opacity": 0.5,
        },
      });
      map.setLayoutProperty("DEM80cm", "visibility", "none");
    
      map.addLayer({
        id: "DEM150cm",
        type: "raster",
        source: "DEM150cm",
        paint: {
          "raster-opacity": 0.5,
        },
      });
      map.setLayoutProperty("DEM150cm", "visibility", "none");
    
}