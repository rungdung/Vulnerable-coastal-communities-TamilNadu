# Context: 
Coastal zones of tamilnadu have been neglected and the socio-sphere of the coastal zones of TN is being rapidly orbanised with increasing coastal traffic and interest in industries along the coast. There have been multiple interviews based on a researcher's work that I have been involved in.

## Who is it being visualised/developed for?

How do I present this to the local fishermen?

- But then again they go back to the same shore, because their livelihoods are dependant on the coast. How do I present it to them? Tamil versions? Animations?
- Should i show micro views. We are used to seeing maps as whole countries, states, districts. Do they realise it? Why do maps show up in the lowest zoom level possible? 
- How do I show them the impact of climate change on their livelihoods?

## What is the outcome expected?

To understand the impact of climate change on local people and communities.
Consider a sea level rise simulator like what NOAA has for America [^1] [^2] [^3]
- This would include the coastal communities, the coastal landuse dataset to calculate loss and other vulnerable community datasets on the same map.
- This should allow a more personal direction, a more personal connection. Should it ideally start with a map? Why are there no Tamil based maps?

Base website starter created
- Figuring out the MapLibre library
- Issues with GeoJSON hosting curved geometries
- Load DEM, crop rasters

Roadmap
- Relationships should be explored and exploited for good visualisations
- Comparison view
- Narrative flow


### What am i visualising again?
- Vulnerable communities
- Coastal regulation zones
- at risk regions(flood maps)

## Run instructions

```
npm run dev
```


[^1]:  Sea Level Rise Viewer, NOAA,  https://coast.noaa.gov/ b
[^2]: _Make Quick Inundation Maps in QGIS Using Open Data_, dir. by Hans van der Kwast, 2018 <[https://www.youtube.com/watch?v=QXQ92oVua3s](https://www.youtube.com/watch?v=QXQ92oVua3s)> [accessed 5 May 2023]
[^3]: ‘IPCC AR6 Sea Level Projection Tool’, _NASA Sea Level Change Portal_ <[https://sealevel.nasa.gov/ipcc-ar6-sea-level-projection-tool](https://sealevel.nasa.gov/ipcc-ar6-sea-level-projection-tool)> [accessed 5 May 2023]