package org.elsysbg.ip.review;

import org.elsysbg.ip.review.services.EntityManagerService;
import org.elsysbg.ip.review.services.PersonsService;
import org.elsysbg.ip.review.services.ReviewsService;
import org.elsysbg.ip.review.services.EstablishmentsService;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class ReviewServletContextListener extends GuiceServletContextListener {

	public static Injector injector;

	@Override
	protected Injector getInjector() {
		if (injector == null) {
			injector = Guice.createInjector(new ServletModule() {
				@Override
				protected void configureServlets() {
					bind(PersonsService.class);
					bind(EstablishmentsService.class);
					bind(EntityManagerService.class);
					bind(ReviewsService.class);
				}
			});
		}
		return injector;
	}
}