  /**
    @class
    <p>Computed properties allow you create dynamic fields on stored documents at query
    time. For example, you might have a set of document thats containsthe fields
    <code>price</code> and <code>quantity</code>. At query time, you could define a computed
    property that dynamically creates a new field called <code>total</code>in each document
    based on the calculation <code>price * quantity</code>.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895052">View Code Example</a></p>

    @name ejs.ComputedProperty

    @desc
    <p>Computes dynamic document properties based on information from other fields.</p>

    @param {String} fieldName A name of the computed property to create.

    */
  ejs.ComputedProperty = function (fieldName) {
    var script = {};

    script[fieldName] = {};

    return {

      /**
            The script language being used. Currently supported values are
            <code>javascript</code> and <code>mvel</code>.

            @member ejs.ComputedProperty
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return script[fieldName].lang;
        }
      
        script[fieldName].lang = language;
        return this;
      },

      /**
            Sets the script/code that will be used to perform the calculation.

            @member ejs.ComputedProperty
            @param {String} expression The script/code to use.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (expression) {
        if (expression == null) {
          return script[fieldName].script;
        }
      
        script[fieldName].script = expression;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.ComputedProperty
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        if (oParams == null) {
          return script[fieldName].params;
        }
      
        script[fieldName].params = oParams;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.ComputedProperty
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(script);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.ComputedProperty
            @returns {String} the type of object
            */
      _type: function () {
        return 'computed property';
      },
      
      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.ComputedProperty
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      _self: function () {
        return script;
      }
    };
  };
