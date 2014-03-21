  /**
    @class
    <p>The script_score function allows you to wrap another query and customize
    the scoring of it optionally with a computation derived from other numeric
    field values in the doc using a script expression.</p>

    @name ejs.ScriptScoreFunction
    @ejs scorefunction
    @borrows ejs.ScoreFunctionMixin.filter as filter
    @borrows ejs.ScoreFunctionMixin._type as _type
    @borrows ejs.ScoreFunctionMixin.toJSON as toJSON

    @desc
    <p>Modify a documents score using a script.</p>

    */
  ejs.ScriptScoreFunction = function () {

    var
      _common = ejs.ScoreFunctionMixin('script_score'),
      func = _common.toJSON();

    return extend(_common, {

      /**
      Set the script that will modify the score.

      @member ejs.ScriptScoreFunction
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return func.script_score.script;
        }

        func.script_score.script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.ScriptScoreFunction
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return func.script_score.lang;
        }

        func.script_score.lang = language;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.ScriptScoreFunction
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return func.script_score.params;
        }

        func.script_score.params = p;
        return this;
      }


    });
  };
