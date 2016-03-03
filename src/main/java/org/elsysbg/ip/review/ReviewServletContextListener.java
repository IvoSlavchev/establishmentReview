package main.java.org.elsysbg.ip.review;

import main.java.org.elsysbg.ip.review.services.EntityManagerService;
import main.java.org.elsysbg.ip.review.services.PersonsService;

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
					bind(EntityManagerService.class);
				}
			});
		}

		return injector;
	}
}