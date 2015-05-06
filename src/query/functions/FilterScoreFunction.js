  /**
    @class
    <p>A basic filter score function, which mathces a filter and applies a
    weight.</p>

    @name ejs.FilterScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin.weight as weight
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @desc
    <p>Randomly score documents.</p>

    */
  ejs.FilterScoreFunction = function (filter, weight) {

    var
      _common = ejs.ScoreFunctionMixin(),
      func = _common.toJSON();

    if ((filter == null || !isFilter(filter)) || weight == null) {
      throw new Error("filter must be a Filter and weight must be a Number");
    }

    func.filter = filter;
    func.weight = weight;

    return extend(_common, {});
  };
