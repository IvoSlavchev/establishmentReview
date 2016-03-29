package org.elsysbg.ip.review.services;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.PasswordMatcher;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.entities.Person;

@Singleton
public class AuthenticationService {
	private final Provider<PersonsService> personsServiceProvider;
	private final Provider<EstablishmentsService> establishmentsServiceProvider;

	@Inject
	public AuthenticationService(Provider<PersonsService> personsServiceProvider,
			Provider<EstablishmentsService> establishmentsServiceProvider) {
		this.personsServiceProvider = personsServiceProvider;
		this.establishmentsServiceProvider = establishmentsServiceProvider;
	}

	public Person getCurrentlyLoggedInPerson(Subject subject) {
		final String username = (String) subject.getPrincipal();
		if (username == null) {
			return null;
		}
		return personsServiceProvider.get().getPersonByUsername(username);
	}
	
	public Establishment getCurrentlyLoggedInEstablishment(Subject subject) {
		final String username = (String) subject.getPrincipal();
		if (username == null) {
			return null;
		}
		return establishmentsServiceProvider.get().getEstablishmentByUsername(username);
	}

	public String encryptPassword(String password) {
		final PasswordService passwordService = getPasswordService();
		return passwordService.encryptPassword(password);
	}

	private PasswordService getPasswordService() {
		final RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		final Collection<Realm> realms = securityManager.getRealms();
		PasswordMatcher credentialsMatcher = null;
		for (Realm next : realms) {
			if (next instanceof AuthenticatingRealm) {
				final AuthenticatingRealm authenticatingRealm = (AuthenticatingRealm) next;
				if (authenticatingRealm.getCredentialsMatcher() instanceof PasswordMatcher) {
					credentialsMatcher = (PasswordMatcher) authenticatingRealm.getCredentialsMatcher();
					break;
				}
			}
		}
		if (credentialsMatcher == null) {
			throw new IllegalStateException("Bad configuration");
		}
		return credentialsMatcher.getPasswordService();
	}

	public void login(Subject subject, String username, String password) {
		final UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		subject.login(token);
	}

	public void logout(Subject subject) {
		subject.logout();
	}
}