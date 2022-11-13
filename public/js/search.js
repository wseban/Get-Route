const handleSearch = async () => {
  const searchString = document.getElementById("searchInput").value;
  document.location = `/?search=${searchString}`;
};
