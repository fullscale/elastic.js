  /**
    @mixin
    <p>The ScoreFunctionMixin provides support for common options used across
    various <code>ScoreFunction</code> implementations.  This object should not be
    used directly.</p>

    @name ejs.ScoreFunctionMixin
    */
  ejs.ScoreFunctionMixin = function (name) {

    var func = {};
    func[name] = {};

    return {

      /**
      Adds a filter whose matching documents will have the score function applied.

      @member ejs.ScoreFunctionMixin
      @param {Filter} oFilter Any valid <code>Filter</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      filter: function(oFilter) {
        if (oFilter == null) {
          return func.filter;
        }

        if (!isFilter(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }

        func.filter = oFilter.toJSON();
        return this;
      },

      /**
      The type of ejs object.  For internal use only.

      @member ejs.ScoreFunctionMixin
      @returns {String} the type of object
      */
      _type: function () {
        return 'score function';
      },

      /**
      <p>Retrieves the internal <code>agg</code> object. This is typically used by
         internal API functions so use with caution.</p>

      @member ejs.ScoreFunctionMixin
      @returns {String} returns this object's internal object.
      */
      toJSON: function () {
        return func;
      }

    };
  };
