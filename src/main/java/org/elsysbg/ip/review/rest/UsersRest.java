package main.java.org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import main.java.org.elsysbg.ip.review.entities.User;
import main.java.org.elsysbg.ip.review.services.UsersService;

@Path("/users")
public class UsersRest {
	private final UsersService usersService;

	@Inject
	public UsersRest(UsersService usersService) {
		this.usersService = usersService;
	}
	
	@POST
	@Path("/signup")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public User createTask(User user) {
		return usersService.createTask(user);
	}
}