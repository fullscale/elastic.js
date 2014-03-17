  /**
    @class
    <p>A multi-bucket aggregation that works on geo_point fields and conceptually
    works very similar to the range aggregation. The user can define a point of
    origin and a set of distance range buckets. The aggregation evaluate the
    distance of each document value from the origin point and determines the
    buckets it belongs to based on the ranges (a document belongs to a bucket
    if the distance between the document and the origin falls within the distance
    range of the bucket).</p>

    @name ejs.GeoDistanceAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that works on geo_point fields and conceptually works very
    similar to the range aggregation.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.GeoDistanceAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      point = ejs.GeoPoint([0, 0]),
      agg = _common.toJSON();

    agg[name].geo_distance = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.GeoDistanceAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].geo_distance.field;
        }

        agg[name].geo_distance.field = field;
        return this;
      },

      /**
      Sets the distance unit.  Valid values are:
      in, yd, ft, km, NM, mm, cm, mi, and m.

      @member ejs.GeoDistanceAggregation
      @param {Number} unit the unit of distance measure.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      unit: function (unit) {
        if (unit == null) {
          return agg[name].geo_distance.unit;
        }

        if (unit === 'in' || unit === 'yd' || unit === 'ft' || unit === 'km' ||
            unit === 'NM' || unit === 'mm' || unit === 'cm' || unit === 'mi' ||
            unit === 'm')  {
          agg[name].geo_distance.unit = unit;
        }

        return this;
      },

      /**
      How to compute the distance. Valid values are:
      plane, arc, sloppy_arc, and factor.

      @member ejs.GeoDistanceAggregation
      @param {String} type The execution type as a string.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      distanceType: function (type) {
        if (type == null) {
          return agg[name].geo_distance.distance_type;
        }

        type = type.toLowerCase();
        if (type === 'plane' || type === 'arc' || type === 'sloppy_arc' ||
            type === 'factor') {
          agg[name].geo_distance.distance_type = type;
        }

        return this;
      },

      /**
      Sets the point of origin from where distances will be measured.

      @member ejs.GeoDistanceAggregation
      @param {GeoPoint} p A valid GeoPoint object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      origin: function (p) {
        if (p == null) {
          return point;
        }

        if (!isGeoPoint(p)) {
          throw new TypeError('Argument must be a GeoPoint');
        }

        point = p;
        agg[name].geo_distance.origin = p.toJSON();
        return this;
      },

      /**
      Sets the point of origin from where distances will be measured. Same as
      origin.

      @member ejs.GeoDistanceAggregation
      @param {GeoPoint} p A valid GeoPoint object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      point: function (p) {
        if (p == null) {
          return point;
        }

        if (!isGeoPoint(p)) {
          throw new TypeError('Argument must be a GeoPoint');
        }

        point = p;
        agg[name].geo_distance.point = p.toJSON();
        return this;
      },

      /**
      Sets the point of origin from where distances will be measured. Same as
      origin.

      @member ejs.GeoDistanceAggregation
      @param {GeoPoint} p A valid GeoPoint object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      center: function (p) {
        if (p == null) {
          return point;
        }

        if (!isGeoPoint(p)) {
          throw new TypeError('Argument must be a GeoPoint');
        }

        point = p;
        agg[name].geo_distance.center = p.toJSON();
        return this;
      },

      /**
      Adds a range to the list of exsiting range expressions.

      @member ejs.GeoDistanceAggregation
      @param {String} from The start value, use null to ignore
      @param {String} to The end value, use null to ignore.
      @param {String} key Optional key/bucket name for keyed responses.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      range: function (from, to, key) {
        var rangeObj = {};
        if (agg[name].geo_distance.ranges == null) {
          agg[name].geo_distance.ranges = [];
        }

        if (from == null && to == null) {
          return agg[name].geo_distance.ranges;
        }

        if (from != null) {
          rangeObj.from = from;
        }

        if (to != null) {
          rangeObj.to = to;
        }

        if (key != null) {
          rangeObj.key = key;
        }

        agg[name].geo_distance.ranges.push(rangeObj);
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.GeoDistanceAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].geo_distance.keyed;
        }

        agg[name].geo_distance.keyed = trueFalse;
        return this;
      }

    });
  };
