import user, { login, join } from "./user";
import nock from "nock";
import configure from "../configure";
import "../../setupTest";

describe("user", () => {
  describe("reducer", () => {
    const store = configure();
    const userid = "test2";
    const password = "1234";
    it("should process login", async () => {
      nock("http://localhost:/api/user/")
        .post("/login", { userid: userid, password: password })
        .once()
        .reply(200);

      await store.dispatch(login({ userid, password }));
      console.log(store.getState().pender.pending);
      expect(store.getState().user);
    });
    it("should process join", async () => {      
      const sigininfo = {
        userid: "test2332",
        name: "testtest",
        password: "12345",
        phone: "010-1111-1111",
        email: "ttt@tt.ttt"
      };      
      

      await store.dispatch(join(sigininfo));
      //console.log(store.getState().pender.pending);
      //expect(store.getState().user);
    });
  });
});
