/**
 * The LayerSpecModel model.
 *
 * @return LayerSpecModel (extends Backbone.Model).
 */
define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var LayerSpecModel = Backbone.Model.extend({

    layerOrder: [
      'forestgain',
      'loss',
      'forma',
      'imazon',
      'modis',
      'fires',
      'terrailoss',
      'modis_cover',
      'imazon_cover',
      'forma_cover',
      'terraicanvas_cover_cover',
      'logging',
      'mining',
      'oil_palm',
      'wood_fiber_plantations',
      'protected_areasCDB',
      'biodiversity_hotspots',
      'resource_rights',
      'land_rights',
      'ifl_2000',
      'ifl_2013_deg',
      'idn_primary',
      'colombia_forest_change',
      'mangrove',
      'pantropical',
      'forest2000',
      'grump2000',
    ],

    categoryOrder: [
      'forest_clearing',
      'forest_cover',
      'forest_use',
      'people',
      'conservation',
      'stories'
    ],

    /**
     * Add a position attribute to the provided layers.
     *
     * @param  {object} layers
     * @return {object} layers
     */
    positionizer: function(layers) {
      var layerOrder = _.intersection(this.layerOrder, _.pluck(layers, 'slug'));

      _.each(layerOrder, _.bind(function(slug, i) {
        layers[slug].position = this.layerOrder.indexOf(slug);
      }, this ));

      return layers;
    },

    getLayer: function(where) {
      if (!where) {return;}
      var layer = _.findWhere(this.getLayers(), where, this);
      return layer;
    },

    /**
     * Get all the layers uncategorized.
     * {forest2000: {}, gain:{}, ...}
     *
     * @return {object} layers
     */
    getLayers: function() {
      var layers = {};

      _.each(this.toJSON(), function(category) {
        _.extend(layers, category);
      });

      return this.positionizer(layers);
    },

    /**
     * Return baselayers object.
     *
     * @return {object} baselayers
     */
    getBaselayers: function() {
      return this.positionizer(this.get('forest_clearing') || {});
    },

    /**
     * Return sublayers object.
     *
     * @return {object} sublayers
     */
    getSublayers: function() {
      var layers = {};

      _.each(_.omit(this.toJSON(), 'forest_clearing'),
        function(results) {
          layers = _.extend(layers, results);
        });

      return this.positionizer(layers);
    },

   /**
     * Return an ordered array of layers. Order by layer position.
     *
     * @return {array} layers
     */
    getOrderedLayers: function() {
      return _.sortBy(this.getLayers(), function(layer) {
        return layer.position;
      });
    },

    /**
     * Return an ordered array of categories and layers.
     *
     * @return {array} categories
     */
    getLayersByCategory: function() {
      var categories = [];

      _.each(this.categoryOrder, _.bind(function(categoryName) {
        var category = this.get(categoryName);
        if (category) {
          categories.push(_.sortBy(this.positionizer(category),
            function(layer) {
              return layer.position;
            }));
        }
      }, this));

      return categories;
    }

  });

  return LayerSpecModel;

});
