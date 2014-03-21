  /**
    @class
    <p>The boost_factor score allows you to multiply the score by the provided
    boost_factor. This can sometimes be desired since boost value set on specific
    queries gets normalized, while for this score function it does not.</p>

    @name ejs.BoostFactorScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @param {Float} boostVal the boost factor.

    @desc
    <p>Multiply the score by the provided boost_factor.</p>

    */
  ejs.BoostFactorScoreFunction = function (boostVal) {

    var
      _common = ejs.ScoreFunctionMixin('boost_factor'),
      func = _common.toJSON();

    func.boost_factor = boostVal;

    return extend(_common, {

      /**
      Sets the boost factor.

      @member ejs.BoostFactorScoreFunction
      @param {Float} b the boost factor.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      boost: function (b) {
        if (b == null) {
          return func.boost_factor;
        }

        func.boost_factor = b;
        return this;
      }

    });
  };
