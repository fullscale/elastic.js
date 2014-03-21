  /**
    @class
    <p>Decay functions score a document with a function that decays depending on
    the distance of a numeric field value of the document from a user given
    origin. This is similar to a range query, but with smooth edges instead of
    boxes.</p>

    <p>Supported decay functions are: linear, exp, and gauss.</p>

    @name ejs.DecayScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @param {String} field the document field to run decay function against.

    @desc
    <p>Score a document with a function that decays depending on the distance
    of a numeric field value of the document from given origin.</p>

    */
  ejs.DecayScoreFunction = function (field) {

    var
      mode = 'gauss', // default decay function
      _common = ejs.ScoreFunctionMixin(mode),
      func = _common.toJSON(),
      changeMode = function (newMode) {
        var oldValue;
        if (mode !== newMode) {
          oldValue = func[mode];
          delete func[mode];
          mode = newMode;
          func[mode] = oldValue;
        }
      };

    func[mode][field] = {};

    return extend(_common, {

      /**
      Use the linear decay function. Linear decay.

      @member ejs.DecayScoreFunction
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      linear: function () {
        changeMode('linear');
      },

      /**
      Use the exp decay function. Exponential decay.

      @member ejs.DecayScoreFunction
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      exp: function () {
        changeMode('exp');
      },

      /**
      Use the gauss decay function. Normal decay.

      @member ejs.DecayScoreFunction
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      gauss: function () {
        changeMode('gauss');
      },

      /**
      Sets the fields to run the decay function against.

      @member ejs.DecayScoreFunction
      @param {String} f A valid field name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (f) {
        var oldValue = func[mode][field];

        if (f == null) {
          return field;
        }

        delete func[mode][field];
        field = f;
        func[mode][field] = oldValue;

        return this;
      },

      /**
      Sets the scale/rate of decay.

      @member ejs.DecayScoreFunction
      @param {String} s A valid scale value for the field type.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scale: function (s) {
        if (s == null) {
          return func[mode][field].scale;
        }

        func[mode][field].scale = s;
        return this;
      },

      /**
      Sets the origin which is the “central point” from which the distance is
      calculated.

      @member ejs.DecayScoreFunction
      @param {String} o A valid origin value for the field type.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      origin: function (o) {
        if (o == null) {
          return func[mode][field].origin;
        }

        if (isGeoPoint(o)) {
          func[mode][field].origin = o.toJSON();
        } else if (isEJSObject(o)) {
          throw new TypeError('origin must be a GeoPoint or native type');
        } else {
          func[mode][field].origin = o;
        }

        return this;
      },

      /**
      Sets the decay value which defines how documents are scored at the distance
      given at scale.

      @member ejs.DecayScoreFunction
      @param {Double} d A decay value as a double.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      decay: function (d) {
        if (d == null) {
          return func[mode][field].decay;
        }

        func[mode][field].decay = d;
        return this;
      },

      /**
      Sets the decay offset.  The decay function will only compute a the decay
      function for documents with a distance greater that the defined offset.
      The default is 0.

      @member ejs.DecayScoreFunction
      @param {String} o A valid offset value for the field type.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      offset: function (o) {
        if (o == null) {
          return func[mode][field].offset;
        }

        func[mode][field].offset = o;
        return this;
      }

    });
  };
