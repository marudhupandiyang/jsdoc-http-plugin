/**
 * This module defines a custom jsDoc tag.
 * It allows you to document responce code of a route.
 * @module lib/responsecode
 */

'use strict'

const tableBuilder = require('./parameterTableBuilder')

exports.name = 'code'
exports.options = {
  mustHaveValue: true,
  mustNotHaveDescription: false,
  canHaveType: true,
  canHaveName: false,
  onTagged: function (doclet, tag) {
    if (!doclet.code) {
      doclet.code = []
    }

    doclet.code.push({
      'type': tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names) : '',
      'description': tag.value.description || '',
      'params': [],
    })
  }
}
exports.newDocletHandler = function (e) {
  const codes = e.doclet.code || [];
  
  const listItems = [];
  codes.forEach(function(code) {
    listItems.push(`
      <li>
        <div><b>Response ${code.type}</b> ${code.description}</div>
        ${
          code.params.length ?
          `<h6>Body:</h6><table class="params">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th class="last">Description</th>
            </tr>
          </thead>
          <tbody>
            ${code.params.map(function(param){
               return `<tr><td>${param.name}</td><td>${param.type}</td><td>${param.description}</td></tr>`
            })}
          </tbody>
          </table>
          <br>` : '<h6>Body:</h6>None'
        }
      </li>
    `);
  });
  const responsesHTML = `<h5>Responses:</h5><ul>${listItems.join('')}</ul>`;
  e.doclet.description = `${e.doclet.description}<br>${responsesHTML}`;
}
