  /**
    @class
    <p>The field_value_factor function allows you to use a field from a document to
    influence the score. It’s similar to using the script_score function, however,
    it avoids the overhead of scripting. If used on a multi-valued field, only the
    first value of the field is used in calculations.</p>

    @name ejs.FieldValueFactorFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @param {String} field the field to apply the function to.

    @desc
    <p>Multiply the score by the value of the field, multiplied by the factor.</p>

    */
  ejs.FieldValueFactorFunction = function (field) {

    var
      _common = ejs.ScoreFunctionMixin('field_value_factor'),
      func = _common.toJSON();

    func.field_value_factor.field = field;

    return extend(_common, {

      /**
      Sets the factor.

      @member ejs.FieldValueFactorFunction
      @param {Float} factor the factor.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      factor: function (factor) {
        if (factor == null) {
          return func.field_value_factor.factor;
        }

        func.field_value_factor.factor = factor;
        return this;
      },

      /**
      Sets the modifier.

      @member ejs.FieldValueFactorFunction
      @param {Float} modifier the modifier, one of none, log, log1p, log2p, ln, ln1p, ln2p, square, sqrt or reciprocal
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      modifier: function (modifier) {
        if (modifier == null) {
          return func.field_value_factor.modifier;
        }

        func.field_value_factor.modifier = modifier;
        return this;
      }

    });
  };
