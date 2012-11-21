  /**
    @class
    <p>The <code>Document</code> object provides an interface for storing, retrieving, and deleting
    documents in Cloud9. Documents cannot be updated "in place". To update a specific document (or
    set of documents), you must retrieve the document/s, update the desired properties, and the
    store them back into Cloud9.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1962044">View Code Example</a></p>

    @name ejs.Document

    @desc
    <p>Object used to create, replace, and delete JSON objects/documents in Cloud9</p>

    @param {Object} doc A meta object representing a document. The object should contain the collection,
    type, and id as well as the actual document object (when applicable).<br><br>

    <div class="alert-message block-message info">
        <p>
            <strong>Tip: </strong>
            It is not necessary to first create a collection or content-type. If either of these
            do not exist, they will be automatically created when you attempt to store the document.
        </p>
    </div>
    */
  ejs.Document = function (conf) {

    return {

      /**
            <p>Retrieves a document from the given collection and type. This call runs synchronously
               when used on the server side. The callback is still executed and the function
               returns the return value of the callback.</p>

            @member ejs.Document
            @param {Function} fnCallBack A callback function that handles the response.
            @returns {void} Returns the value of the callback when executing on the server.
            */
      get: function (fnCallBack) {
      },

      /**
            <p>Stores a document in the given collection and type but dynamically generates an id.
               This call runs synchronously when used on the server side. The callback is still
               executed and the function returns the return value of the callback.</p>

            @member ejs.Document
            @param {Function} fnCallBack A callback function that handles the response.
            @returns {void} Returns the value of the callback when executing on the server.
            */
      post: function (fnCallBack) {
      },

      /**
            <p>Stores a document in the given collection and type using the specified id. This
               call runs synchronously when used on the server side. The callback is still
               executed and the function returns the return value of the callback.</p>

            @member ejs.Document
            @param {Function} fnCallBack A callback function that handles the response.
            @returns {void} Returns the value of the callback when executing on teh server.
            */
      put: function (fnCallBack) {
      },

      /**
            <p>Deletes the document using the speciifed id. This call runs synchronously
               when used on the server side. The callback is still executed and the function
               returns the return value of the callback.</p>

            @member ejs.Document
            @param {Function} fnCallBack A callback function that handles the response.
            @returns {void} Returns the value of the callback when executing on the server.
            */
      del: function (fnCallBack) {
      }

    };
  };

