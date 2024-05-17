// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQB3gR4w5h_I6TdKP8bfm6ybdzvlh1S4fo10KVP84WBBiUj29hfZgorfZIMDviYdubyn-7KkNPQ0LoMA5HUK_lRWUCMW89OOaznn427P7_LQEwkuk2j9qe9ehSfH5GoCr5j_reGPsKG5ZUdrkWHhKM_jq_rFxwsxUV4iUAhVh2k0hyeDsYxGhIl5CRk8mTrS7lJAz-NWYlw0g7zBbFyWWyKoOrDGl-FaDvL-INdG-zNcW8133U8rezzgqkInEF6As4VPk5N4Wj579KRUVBGQIKiI';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//   )).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );

// module.exports = { fetchWebApi, getTopTracks };
