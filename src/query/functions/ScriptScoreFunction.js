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
      script: function (oScript) {
        if (oScript == null) {
          return func.script_score.script;
        }

        if (!isScript(oScript)) {
          throw new TypeError('Argument must be a Script');
        }

        func.script_score.script = oScript.toJSON();
        return this;
      },
    });
  };
