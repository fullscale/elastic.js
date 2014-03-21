  /**
    @class
    <p>The random_score generates scores via a pseudo random number algorithm
    that is initialized with a seed.</p>

    @name ejs.RandomScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @desc
    <p>Randomly score documents.</p>

    */
  ejs.RandomScoreFunction = function () {

    var
      _common = ejs.ScoreFunctionMixin('random_score'),
      func = _common.toJSON();

    return extend(_common, {

      /**
      Sets random seed value.

      @member ejs.RandomScoreFunction
      @param {Long} s A seed value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      seed: function (s) {
        if (s == null) {
          return func.random_score.seed;
        }

        func.random_score.seed = s;
        return this;
      }

    });
  };
