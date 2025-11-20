"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  quickMenu: [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events & Programs", href: "/events" },
    { name: "Contact", href: "/contact" },
  ],
  usefulLinks: [
    { name: "JMAS", href: "#" },
    { name: "E-Learning", href: "https://cimsstudentnewui.mastersofterp.in/", external: true },
    { name: "NMC / University", href: "#" },
    { name: "Alumni", href: "#" },
    { name: "Dspace-CRIS", href: "#" },
    { name: "Educational ERP", href: "#" },
  ],
  institutions: [
    { name: "Deccan School of Pharmacy", href: "#" },
    { name: "Deccan School of Hospital Management", href: "#" },
    { name: "Deccan College of Engineering", href: "#" },
    { name: "Owaisi College of Nursing", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white noise-overlay">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-800/10"></div>
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text-green text-shadow-premium">DCMS</h3>
            <p className="text-white mb-6 leading-relaxed font-medium">
              The Deccan College of Medical Sciences (DCMS) is one of the oldest and most sought-after medical colleges in State of Telangana.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-lg hover:bg-green-800 transition-all shadow-premium hover:shadow-glow tilt-3d"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white gradient-text-cream">Quick Menu</h4>
            <ul className="space-y-3">
              {footerLinks.quickMenu.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:bg-green-800/20 px-3 py-1 rounded-lg transition-all duration-300 flex items-center group cursor-pointer underline-animated"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-green-400 to-green-600 mr-0 group-hover:mr-2 transition-all duration-300 shadow-glow"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white gradient-text-cream">Useful Links</h4>
            <ul className="space-y-3">
              {footerLinks.usefulLinks.map((link) => (
                <li key={link.name}>
                  {(link as any).external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white hover:bg-green-800/20 px-3 py-1 rounded-lg transition-all duration-300 flex items-center group cursor-pointer underline-animated"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-green-400 to-green-600 mr-0 group-hover:mr-2 transition-all duration-300 shadow-glow"></span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white hover:bg-green-800/20 px-3 py-1 rounded-lg transition-all duration-300 flex items-center group cursor-pointer underline-animated"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-green-400 to-green-600 mr-0 group-hover:mr-2 transition-all duration-300 shadow-glow"></span>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white gradient-text-cream">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cream mt-1 flex-shrink-0" />
                <span className="text-white font-medium">
                  DMRL &apos;X&apos; Road, Kanchanbagh,<br />
                  Hyderabad–500058, Telangana, India.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cream flex-shrink-0" />
                <div className="text-white font-medium">
                  <a href="tel:04024340225" className="hover:text-white transition-colors">
                    040-24340225
                  </a>
                  <br />
                  <a href="tel:04024343129" className="hover:text-white transition-colors">
                    040-24343129
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cream flex-shrink-0" />
                <a
                  href="mailto:principal@dcms.ac.in"
                  className="text-white hover:text-cream transition-colors font-medium"
                >
                  principal@dcms.ac.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white text-sm font-medium">
            Copyright © 1984-2025. Deccan College of Medical Sciences. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-white">
            <Link href="#" className="hover:text-cream transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cream transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}


