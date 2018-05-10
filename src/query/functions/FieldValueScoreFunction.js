  /**
    @class
    <p>The script_score function allows you to wrap another query and customize
    the scoring of it optionally with a computation derived from other numeric
    field values in the doc using a script expression.</p>

    @name ejs.FieldValueScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @desc
    <p>Modify a documents score using a script.</p>

    */
  ejs.FieldValueScoreFunction = function () {

    var
      _common = ejs.ScoreFunctionMixin('field_value_factor'),
      func = _common.toJSON();

    return extend(_common, {

      /**
       Set the field that will modify the score.

       @member ejs.FieldValueScoreFunction
       @param {String} field A valid field string.
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      field: function (field) {
        if (field == null) {
          return func.field_value_factor.field;
        }

        func.field_value_factor.field = field;
        return this;
      },

      /**
       The factor being used.

       @member ejs.FieldValueScoreFunction
       @param {String} factor The factor.
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
       The modifier being used.

       @member ejs.FieldValueScoreFunction
       @param {String} factor The modifier.
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
