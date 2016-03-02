package main.java.org.elsysbg.ip.review;

import javax.inject.Inject;

import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

public class ReviewApplication extends ResourceConfig {

	public ReviewApplication() {
	}

	@Inject
	public ReviewApplication(ServiceLocator serviceLocator) {
		this();

		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
		final GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		guiceBridge.bridgeGuiceInjector(ReviewServletContextListener.injector);
	}
}