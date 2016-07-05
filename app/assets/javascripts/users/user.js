app.factory("User", function($resource){
	 return $resource("/users/:id.json", {id: '@id'}, {
    query: { method: "GET", isArray: true },
    update:{ method:'PUT'}
  });
})