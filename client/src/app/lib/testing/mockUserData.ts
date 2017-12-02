import { User } from '../domain/user';

export class MockUserData{

	static user1: User = new User();
	static user2: User = new User();
	static user3: User = new User();
	static user4: User = new User();
	static user5: User = new User();
	static user6: User = new User();
	static user7: User = new User();
	static user8: User = new User();
	static user9: User = new User();
	static user10: User = new User();
	static user11: User = new User();
	static user12: User = new User();
	static user13: User = new User();
	static user14: User = new User();
	static user15: User = new User();
	static user16: User = new User();
	static user17: User = new User();
	static mockUserData: User[] = [];

	static intialize(){

		MockUserData.user1.firstName = "";
		MockUserData.user1.lastName = "Leger";
		MockUserData.user1.photoUrl = "/assets/img/mumbo_jumbo.png";

		MockUserData.user2.firstName = "";
		MockUserData.user2.lastName = "";
		MockUserData.user2.email = "ericrivera228@gmail.com";
		MockUserData.user2.photoUrl = "/assets/img/happy_eric.jpg";

		MockUserData.user3.firstName = "Irina";
		MockUserData.user3.lastName = "Gorelick";
		MockUserData.user3.photoUrl = "/assets/img/irina.jpg";

		MockUserData.user4.firstName = "Ian";
		MockUserData.user4.lastName = "Hughes";

		MockUserData.user5.firstName = "Justin";
		MockUserData.user5.lastName = "Mortara";
		MockUserData.user5.photoUrl = "/assets/img/justin.jpg";		

		MockUserData.user6.firstName = "Taylor"
		MockUserData.user6.lastName = "Chancer";

		MockUserData.user7.firstName = "Regina";
		MockUserData.user7.lastName = "Leger";

		MockUserData.user8.firstName = "Andrea";
		MockUserData.user8.lastName = "Crass";		

		MockUserData.user9.firstName = "Tuzik-Ace-Tuzzy";
		MockUserData.user9.lastName = "Gorelik";

		MockUserData.user10.firstName = "Homeless";
		MockUserData.user10.lastName = "Guy";

		MockUserData.user11.firstName = "Mr. Cool";
		MockUserData.user11.lastName = "Guy";

		MockUserData.user12.firstName = "Nathan";
		MockUserData.user12.lastName = "Drake";
		MockUserData.user12.photoUrl = "/assets/img/Nathan_drake.jpg"

		MockUserData.user13.firstName = "Missy";
		MockUserData.user13.lastName = "Elliot";

		MockUserData.user14.firstName = "Boaty";
		MockUserData.user14.lastName = "McBoatface";
		
		MockUserData.user15.firstName = "Lee";
		MockUserData.user15.lastName = "Russell";
		
		MockUserData.user16.firstName = "Neil";
		MockUserData.user16.lastName = "Gamby";

		MockUserData.user17.firstName = "Tim";
		MockUserData.user17.lastName = "Bo";

		MockUserData.mockUserData.push(MockUserData.user1, MockUserData.user2, MockUserData.user3, MockUserData.user4, MockUserData.user5, MockUserData.user6, MockUserData.user7, MockUserData.user8, MockUserData.user9, MockUserData.user10, MockUserData.user11, MockUserData.user12, MockUserData.user13, MockUserData.user14, MockUserData.user15, MockUserData.user16, MockUserData.user17);

	}

}

MockUserData.intialize();