app.factory("Post", function($resource) {
  return $resource("/posts/:id.json", {id: '@id'}, {
    query: { method: "GET", isArray: true },
    update:{ method:'PUT'}
  });
});
