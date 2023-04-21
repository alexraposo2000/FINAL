// import request = require("request-promise");
// import { closeServer } from '../serverNEW';
// import { Song } from '../../common/song';
// var base_url = "http://localhost:3000/";
// describe("O server", () => {
// //   var server:any;
// //   beforeAll(() => {server = require('../serverNEW')});
// //   afterAll(() => {server.closeServer()});
// // SONG TESTING
//   it("initially returns an empty list of songs", () => {
//     return request.get(base_url + "songs")
//             .then(body =>
//                expect(body).toBe("[]")
//              )
//             .catch(e => 
//                expect(e).toEqual(null)
//              );
//   })
//   it("only add songs", () => {
//     var options:any = {method: 'POST', uri: (base_url + "song/create"), body:{id:0, songName: "Yellow Submarine", artistName: "Beatles", albumId: 1, length: 120}, json: true};
//     return request(options)
//              .then(body =>
//                 expect(body).toEqual({success: "Song successfully added."})
//              ).catch(e =>
//                 expect(e).toEqual(null)
//              )
//   });
//   it("do not add songs with duplicate id", () => {
//     var song1 = {"json":{"id":1, "songName": "Red", "artistName": "Roses", "albumId": 0, "length": 120}};
//     var song2 = {"json":{"id":1, "songName": "Yellow", "artistName": "Rhianna", "albumId": 3, "length": 130}};
//     var response1 = '[{"id":0,"songName":"Yellow Submarine","artistName":"Beatles","albumId":1,"length":120},{"id":1,"songName":"Red","artistName":"Roses","albumId":0,"length":120}]';
//     var response2 = '{"id":1,"songName":"Disturbia","artistName":"Rhianna","albumId":3,"length":130}';
//     return request.post(base_url + "song/create", song1)
//              .then(body => {
//                 expect(body).toEqual({success: "Song successfully added."});
//                 return request.post(base_url + "song/create", song2)
//                          .then(body => {
//                             expect(body).toEqual({failure: "Song could not be added."});
//                             return request.get(base_url + "songs")
//                                      .then(body => {
//                                         expect(body).toContain(response1);
//                                         expect(body).not.toContain(response2);
//                                       });
//                           });
//               })
//               .catch(err => {
//                  expect(err).toEqual(null)
//               });
//  })
//  it("do not add songs with duplicate name", () => {
//    var song1 = {"json":{"id":2, "songName": "Cake By The Ocean", "artistName": "DNCE", "albumId": 1, "length": 120}};
//    var song2 = {"json":{"id":3, "songName": "Cake By The Ocean", "artistName": "Rhianna", "albumId": 2, "length": 130}};
//    var response1 = '[{"id":0,"songName":"Yellow Submarine","artistName":"Beatles","albumId":1,"length":120},{"id":1,"songName":"Red","artistName":"Roses","albumId":0,"length":120},{"id":2,"songName":"Cake By The Ocean","artistName":"DNCE","albumId":1,"length":120}]';
//    var response2 = '{"id":2, "songName": "Cake By The Ocean", "artistName": "Rhianna", "albumId": 2, "length": 130}';
//    return request.post(base_url + "song/create", song1)
//             .then(body => {
//                expect(body).toEqual({success: "Song successfully added."});
//                return request.post(base_url + "song/create", song2)
//                         .then(body => {
//                            expect(body).toEqual({failure: "Song could not be added."});
//                            return request.get(base_url + "songs")
//                                     .then(body => {
//                                        expect(body).toContain(response1);
//                                        expect(body).not.toContain(response2);
//                                      });
//                          });
//              })
//              .catch(err => {
//                 expect(err).toEqual(null)
//              });
// })
// // PLAYLIST TESTING
// it("initially returns an empty list of playlists", () => {
//    return request.get(base_url + "library")
//            .then(body =>
//               expect(body).toBe("[]")
//             )
//            .catch(e =>
//               expect(e).toEqual(null)
//             );
//  })
//  it("only add playlists", () => {
//    var options:any = {method: 'POST', uri: (base_url + "library"), body:{id:0, creatorId: 1, playlistName: "Fun Tunes", songs: [Song]}, json: true};
//    return request(options)
//             .then(body =>
//                expect(body).toEqual({success: "Playlist successfully created."})
//             ).catch(e =>
//                expect(e).toEqual(null)
//             )
//  });
// //  it("do not add playlists with duplicate id", () => {
// //    var playlist1 = {"json":{"id":1, "creatorId": 1, "playlistName": "Happy Music","songs":[Song]}};
// //    var playlist2 = {"json":{"id":1, "creatorId": 2, "playlistName": "Sad Music","songs":[Song]}};
// //    var response1 = '[{"id":1,"creatorId":1,"playlistName":"Fun Tunes","songs":[null]},{"id":2,"creatorId":1,"playlistName":"Happy Music","songs":[null]},{"id":3,"creatorId":2,"playlistName":"Sad Music","songs":[null]}]';
// //    var response2 = '{"id":1, "creatorId": 2, "playlistName": "Sad Music","songs":[]}';
// //    return request.post(base_url + "library", playlist1)
// //             .then(body => {
// //                expect(body).toEqual({success: "Playlist successfully created."});
// //                return request.post(base_url + "library", playlist2)
// //                         .then(body => {
// //                            expect(body).toEqual({failure: "Playlist with this name or id already exists."});
// //                            return request.get(base_url + "library")
// //                                     .then(body => {
// //                                        expect(body).toContain(response1);
// //                                        expect(body).not.toContain(response2);
// //                                      });
// //                          });
// //              })
// //              .catch(err => {
// //                 expect(err).toEqual(null)
// //              });
// // })
// it("do not add playlists with duplicate names", () => {
//    var playlist1 = {"json":{"id":2, "creatorId": 1, "playlistName": "Jazz","songs":[Song]}};
//    var playlist2 = {"json":{"id":3, "creatorId": 2, "playlistName": "Jazz","songs":[Song]}};
//    var response1 = '[{"id":1,"creatorId":1,"playlistName":"Fun Tunes","songs":[null]},{"id":2,"creatorId":1,"playlistName":"Jazz","songs":[null]}]';
//    var response2 = '{"id":2, "creatorId": 2, "playlistName": "Jazz","songs":[]}';
//   return request.post(base_url + "library", playlist1)
//            .then(body => {
//               expect(body).toEqual({success: "Playlist successfully created."});
//               return request.post(base_url + "library", playlist2)
//                        .then(body => {
//                           expect(body).toEqual({failure: "Playlist with this name or id already exists."});
//                           return request.get(base_url + "library")
//                                    .then(body => {
//                                       expect(body).toContain(response1);
//                                       expect(body).not.toContain(response2);
//                                     });
//                         });
//             })
//             .catch(err => {
//                expect(err).toEqual(null)
//             });
// })
// })
// // //ALBUM TESTING
// // it("initially returns an empty list of albums", () => {
// //    return request.get(base_url + "albums")
// //            .then(body =>
// //               expect(body).toBe("[]")
// //             )
// //            .catch(e =>
// //               expect(e).toEqual(null)
// //             );
// //  })
// //  it("create album", () => {
// //    var options:any = {method: 'POST', uri: (base_url + "album"), body:{id:1, albumName: "My album", artistName: "Sania", songs: []}, json: true};
// //    return request(options)
// //             .then(body =>
// //                expect(body).toEqual({success: "Album successfully created."})
// //             ).catch(e =>
// //                expect(e).toEqual(null)
// //             )
// //  });
// //  it("do not create albums with duplicate id", () => {
// //    var album1 = {"json":{"id":1, "albumName": "My favorites", "artistName": "Sania", "albumId": 1, "length": 120}};
// //    var album2 = {"json":{"id":1, "albumName": "Best Album", "artistName": "Rhianna", "albumId": 2, "length": 130}};
// //    var response1 = '{"id":1, "albumName": "My favorites", "artistName": "Sania", "albumId": 1, "length": 120}';
// //    var response2 = '{"id":1, "albumName": "Best Album", "artistName": "Rhianna", "albumId": 2, "length": 130}';
// //    return request.post(base_url + "album", album1)
// //             .then(body => {
// //                expect(body).toEqual({success: "Album successfully added."});
// //                return request.post(base_url + "album", album2)
// //                         .then(body => {
// //                            expect(body).toEqual({failure: "Album could not be added."});
// //                            return request.get(base_url + "albums")
// //                                     .then(body => {
// //                                        expect(body).toContain(response1);
// //                                        expect(body).not.toContain(response2);
// //                                      });
// //                          });
// //              })
// //              .catch(err => {
// //                 expect(err).toEqual(null)
// //              });
// // })
// // it("do not add albums with duplicate name", () => {
// //    var album1 = {"json":{"id":1, "albumName": "Best Album", "artistName": "Sania", "albumId": 1, "length": 120}};
// //    var album2 = {"json":{"id":2, "albumName": "Best Album", "artistName": "Rhianna", "albumId": 2, "length": 130}};
// //    var response1 = '{"id":1, "albumName": "My favorites", "artistName": "Sania", "albumId": 1, "length": 120}';
// //    var response2 = '{"id":1, "albumName": "Best Album", "artistName": "Rhianna", "albumId": 2, "length": 130}';
// //   return request.post(base_url + "album", album1)
// //            .then(body => {
// //               expect(body).toEqual({success: "Album successfully added."});
// //               return request.post(base_url + "album", album2)
// //                        .then(body => {
// //                           expect(body).toEqual({failure: "Album could not be added."});
// //                           return request.get(base_url + "albums")
// //                                    .then(body => {
// //                                       expect(body).toContain(response1);
// //                                       expect(body).not.toContain(response2);
// //                                     });
// //                         });
// //             })
// //             .catch(err => {
// //                expect(err).toEqual(null)
// //             });
// // })
//# sourceMappingURL=songserver.spec.js.map