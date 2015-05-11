  /**
    @class
    <p>A basic filter score function, which mathces a filter and applies a
    weight.</p>

    @name ejs.ScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin.weight as weight
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @desc
    <p>Randomly score documents.</p>

    */
  ejs.ScoreFunction = function () {

    var
      _common = ejs.ScoreFunctionMixin();

    return _common;
  };
