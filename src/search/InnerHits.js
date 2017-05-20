  /**
    @class
    <p>Inner hits can be used by defining a inner_hits definition on a nested,
    has_child or has_parent query and filter. This feature returns per search hit
    in the search response additional nested hits that caused a search hit to
    match in a different scope.</p>

    <p>See https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-inner-hits.html</p>

    @name ejs.InnerHits
    @ejs request

    @desc
    <p>Include additional nested hits in the response.</p>

    */
  ejs.InnerHits = function () {

    var innerHits = {};

    return {

      /**
      <p>The name to be used for the particular inner hit definition in the response.
      Useful when multiple inner hits have been defined in a single search request.
      The default depends in which query the inner hit is defined. For has_child query
      and filter this is the child type, has_parent query and filter this is the parent
      type and the nested query and filter this is the nested path.. </p>

      @member ejs.InnerHits
      @param {String} name The name to be used for the inner hit definition.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      name: function (name) {
        if (name === null) {
          return innerHits.name;
        }

        innerHits.name = name;
        return this;
      },


      /**
      <p> The offset from where the first hit to fetch in the returned regular search hits. </p>

      @member ejs.InnerHits
      @param {Integer} from The offset from the first result you want to fetch.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      from: function (from) {
        if (from === null) {
          return innerHits.from;
        }

        innerHits.from = from;
        return this;
      },

      /**
      <p> The maximum number of hits to return. By default the top three matching hits are returned. </p>

      @member ejs.InnerHits
      @param {Integer} size The numer of hits to be returned.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size === null) {
          return innerHits.size;
        }

        innerHits.size = size;
        return this;
      },

      /**
      <p> How the inner hits should be sorted. By default the hits are sorted by the score. </p>

      @member ejs.InnerHits
      @param {String} sort The field to be sorted on.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      sort: function (sort) {
        if (sort === null) {
          return innerHits.sort;
        }

        innerHits.sort = sort;
        return this;
      },


      /**
      <p>Enable/Disable returning version number for each hit.</p>

      @member ejs.InnerHits
      @param {Boolean} trueFalse true to enable, false to disable
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      version: function (trueFalse) {
        if (trueFalse === null) {
          return innerHits.version;
        }

        innerHits.version = trueFalse;
        return this;
      },

      /**
      <p>Enable/Disable explanation of score for each hit.</p>

      @member ejs.InnerHits
      @param {Boolean} trueFalse true to enable, false to disable
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      explain: function (trueFalse) {
        if (trueFalse === null) {
          return innerHits.explain;
        }

        innerHits.explain = trueFalse;
        return this;
      },

      /**
      <p>Performs highlighting based on the <code>Highlight</code> settings.</p>

      @member ejs.InnerHits
      @param {Highlight} h A valid Highlight object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      highlight: function (h) {
        if (h === null) {
          return innerHits.highlight;
        }

        if (!isHighlight(h)) {
          throw new TypeError('Argument must be a Highlight object');
        }

        innerHits.highlight = h.toJSON();
        return this;
      },

      /**
      <p>Computes a document property dynamically based on the supplied <code>ScriptField</code>.</p>

      @member ejs.InnerHits
      @param {ScriptField} oScriptField A valid <code>ScriptField</code>.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptField: function (oScriptField) {
        if (oScriptField === null) {
          return innerHits.script_fields;
        }

        if (innerHits.script_fields === undefined) {
          innerHits.script_fields = {};
        }

        if (!isScriptField(oScriptField)) {
          throw new TypeError('Argument must be a ScriptField');
        }

        extend(innerHits.script_fields, oScriptField.toJSON());
        return this;
      },

    /**
      <p>Allows to return the field data representation of a field for each hit.</p>

      @member ejs.InnerHits
      @param {Array} Fields to return field data representation for.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      fieldDataFields: function (fielddata_fields) {
        if (fielddata_fields === null) {
          return innerHits.fielddata_fields;
        }

        innerHits.fielddata_fields = fielddata_fields;
        return this;
      },

      /**
      <p> Allows to control how the _source field is returned with every hit.
       By default operations return the contents of the _source field
       unless you have used the fields parameter or if the _source field
       is disabled.  Set the includes parameter to false to completely
       disable returning the source field. </p>

       @member ejs.InnerHits
       @param {(String|Boolean|String[])} includes The field or list of fields to include as array.
         Set to a boolean false to disable the source completely.
       @param {(String|String[])} excludes The  optional field or list of fields to exclude.
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      source: function (includes, excludes) {
        if (includes === undefined && excludes === undefined) {
          return innerHits._source;
        }

        if (!isArray(includes) && !isString(includes) && !isBoolean(includes)) {
          throw new TypeError('Argument includes must be a string, an array, or a boolean');
        }

        if (excludes !== undefined && !isArray(excludes) && !isString(excludes)) {
          throw new TypeError('Argument excludes must be a string or an array');
        }

        if (isBoolean(includes)) {
          innerHits._source = includes;
        } else {
          innerHits._source = {
            includes: includes
          };

          if (excludes != null) {
            innerHits._source.excludes = excludes;
          }
        }

        return this;
      },


      /**
            The type of ejs object.  For internal use only.

            @member ejs.InnerHits
            @returns {String} the type of object
            */
      _type: function () {
        return 'inner hits';
      },

      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.InnerHits
            @returns {String} returns this object's internal object representation.
            */
      toJSON: function () {
        return innerHits;
      }
    };
  };
