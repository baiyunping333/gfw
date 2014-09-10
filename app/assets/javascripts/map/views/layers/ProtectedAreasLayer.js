/**
 * The ProtectedAreas layer module for use on canvas.
 *
 * @return ProtectedAreasLayer class (extends CartoDBLayerClass)
 */
define([
  'underscore',
  'abstract/layer/ImageMaptypeLayerClass',
  'map/services/SitesService'
], function(_, ImageMaptypeLayerClass, SitesService) {

  'use strict';

  var ProtectedAreasLayer = ImageMaptypeLayerClass.extend({

    options: {
      urlTemplate: '//184.73.201.235/blue{/z}{/x}{/y}',
      infowindow: true,
      infowindowAPI: SitesService,
      analysis: true
    }

  });

  return ProtectedAreasLayer;

});