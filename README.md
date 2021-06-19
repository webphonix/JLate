# jlate: New Born [![](https://data.jsdelivr.com/v1/package/npm/jlate/badge)](https://www.jsdelivr.com/package/npm/jlate)

- Best javascript library to load dynamic template


# jlate Installation

- installation:
```
npm i jlate
```

- CDN Available:
```
<script src="https://cdn.jsdelivr.net/combine/npm/lodash,npm/jlate/jlate/jlate.min.js"></script>
```
# jlate Example
## Example

- HTML
```
<body>
    <div>
        <jlate id="my_temp" src="template/jlate_title.html" type="template">
            Loading...
        </jlate>

        <jlate class="form-select form-select-lg mb-3" id="my_temp3" type="select">
            Loading...
        </jlate>

        <jlate id="my_temp2" src="template/jlate_title.html" type="template">
            Loading...
        </jlate>
    </div>
    <script src="https://cdn.jsdelivr.net/combine/npm/lodash,npm/jlate/jlate/jlate.min.js"></script>
</body>
```
- Javascript
```javascript
        var data = {
        title: "Constructing HTML jlate",
        };
        var author = [
        { name: "Guru" },
        { name: "Gurudev" },
        { name: "Test" },
        { name: "Webphonix" },
        ];
        var dd_data = [
        { value: "1", text: "webphonix" },
        { value: "2", text: "webphonix2" },
        { value: "3", text: "webphonix3" },
        { value: "4", text: "webphonix4" },
        { value: "5", text: "webphonix5" },
        { value: "6", text: "webphonix6" },
        ];
        $$("#my_temp2").jlate({ names: author });
        jlate("#my_temp").on("jlate", { title: data }, function (d) {
        console.log(d);
        });
        $$("#my_temp3").jlate(dd_data);

```

- Inside template/jlate_title.html
```
<div>
    <h1>
        <%= title.title %>
            <h1>
                <ul>
                    <% _.each(names, function(n){ %>
                        <li>
                            <%- n.name %>
                        </li>
                        <% }) %>

                </ul>
</div>
<div class="row">
    <% _.each(names, function(n){ %>
        <div class="col-md-6">
            <%- n.name %>
        </div>
        <% }) %>
</div>

```

