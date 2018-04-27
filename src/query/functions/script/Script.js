  /**
    @class
    <p>Script's allow you create srcipt to call it at script score

    @name ejs.Script
    @ejs request

    @desc
    <p>Computes dynamic document properties based on information from other fields.</p>

    @param {String} fieldName A name of the script field to create.

    */
  ejs.Script = function (fieldName) {
    var script = {};

    return {

      /**
            The script language being used. Currently supported values are
            <code>javascript</code> and <code>mvel</code>.

            @member ejs.Script
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return script.lang;
        }
      
        script.lang = language;
        return this;
      },

      /**
            Sets the script/code that will be used to perform the calculation.

            @member ejs.Script
            @param {String} expression The script/code to use.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      inline: function (expression) {
        if (expression == null) {
          return script.inline;
        }
      
        script.inline = expression;
        return this;
      },

      /**
            Sets the script/code file that will be used to perform the calculation.

            @member ejs.Script
            @param {String} file The script/code to use.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      file: function (file) {
        if (file == null) {
          return script.file;
        }

        script.file = file;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.Script
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        if (oParams == null) {
          return script.params;
        }
      
        script.params = oParams;
        return this;
      },

      /**
            Set the script id that will modify the score.

            @member ejs.Script
            @param {Boolean} string
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scriptId: function (scriptId) {
        if (scriptId == null) {
          return script.id;
        }

        script.id = scriptId;
        return this;
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.Script
            @returns {String} the type of object
            */
      _type: function () {
        return 'script';
      },
      
      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.Script
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      toJSON: function () {
        return script;
      }
    };
  };
