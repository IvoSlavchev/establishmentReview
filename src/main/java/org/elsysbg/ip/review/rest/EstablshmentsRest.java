package main.java.org.elsysbg.ip.review.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import main.java.org.elsysbg.ip.review.entities.Establishment;
import main.java.org.elsysbg.ip.review.services.EstablishmentsService;

@Path("/establishment")
public class EstablshmentsRest {
	private final EstablishmentsService establishmentsService;

	@Inject
	public EstablshmentsRest(EstablishmentsService establishmentsService) {
		this.establishmentsService = establishmentsService;
	}
	
	@POST
	@Path("/signup")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment createEstablishment(Establishment establishment) {
		return establishmentsService.createEstablishment(establishment);
	}
}