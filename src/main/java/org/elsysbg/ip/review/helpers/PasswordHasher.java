package org.elsysbg.ip.review.helpers;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class PasswordHasher {
	
	public String getSalt() throws NoSuchAlgorithmException {
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt.toString();
    }
	
	public String getSecurePassword(String passwordToHash, String salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(salt.getBytes());
        byte[] bytes = md.digest(passwordToHash.getBytes());
        StringBuilder sb = new StringBuilder();   
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }        
        return sb.toString();
    }
}