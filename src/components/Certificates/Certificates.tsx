import React from 'react';
import { motion } from 'framer-motion';
import { Section, Card, Button } from '../common';
import { certificates } from '../../data/projects';
import { useAnalytics } from '../../hooks/useAnalytics';
import './Certificates.css';

export const Certificates: React.FC = () => {
  const { trackCertificateClick } = useAnalytics();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section
      id="certificates"
      title="Certificates"
      subtitle="Professional certifications and completed courses"
    >
      <motion.div
        className="certificates__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {certificates.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <Card className="certificate-card">
              <div className="certificate-card__header">
                <div className="certificate-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15l-2 5l-1-3l-3-1l5-2z" />
                    <path d="M12 15l2 5l1-3l3-1l-5-2z" />
                    <circle cx="12" cy="8" r="6" />
                    <path d="M9 8l2 2l4-4" />
                  </svg>
                </div>
                <div className="certificate-card__issuer">
                  {cert.issuer.toLowerCase() === 'meta' ? <MetaLogo /> : <CourseraLogo />}
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <h3 className="certificate-card__title">{cert.title}</h3>
              <p className="certificate-card__date">{cert.date}</p>

              {cert.skills && cert.skills.length > 0 && (
                <div className="certificate-card__skills">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="certificate-card__skill">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <Button
                variant="secondary"
                size="sm"
                href={cert.credentialUrl}
                onClick={() => trackCertificateClick(cert.id)}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                }
                iconPosition="right"
              >
                View Certificate
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

const CourseraLogo: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="certificate-card__issuer-logo certificate-card__coursera-logo"
  >
    <path d="M11.374 23.977c-4.088-.257-7.744-2.53-9.769-6.089a12.2 12.2 0 0 1-.597-10.524A11.93 11.93 0 0 1 7.722.748 11.968 11.968 0 0 1 11.996 0c2.756-.003 5.304.822 7.39 2.386l-2.512 3.324a7.474 7.474 0 0 0-4.87-1.82c-4.144-.003-7.5 3.57-7.5 7.988s3.356 7.991 7.5 7.991c2.31 0 4.378-1.109 5.745-2.835l3.146 2.587c-2.52 3.06-6.199 4.364-9.521 4.356z" />
  </svg>
);

const MetaLogo: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="certificate-card__issuer-logo certificate-card__meta-logo"
  >
    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.239.76-.896 1.476-1.96 2.262-3.185.474-.738.922-1.508 1.343-2.28a37.5 37.5 0 0 1 1.007 1.972c.29.614.565 1.204.826 1.755.402.851.79 1.635 1.185 2.313.976 1.67 1.989 2.664 3.642 2.664 1.776 0 2.898-.768 3.594-1.927.225-.376.408-.789.54-1.225.18-.604.27-1.267.27-1.973 0-2.566-.703-5.24-2.044-7.307-1.188-1.832-2.903-3.113-4.871-3.113-1.784 0-2.953.956-4.293 2.587l-.057.068-.053-.066c-1.376-1.699-2.552-2.59-4.277-2.59zm8.54 5.087c.756.063 1.407.728 2.03 1.745.763 1.243 1.303 2.993 1.303 4.587 0 .509-.05.963-.151 1.35a2.632 2.632 0 0 1-.142.408 1.477 1.477 0 0 1-.15.267c-.262.367-.593.502-1.18.502-.813 0-1.358-.494-2.106-1.776a28.8 28.8 0 0 1-.818-1.62 32.994 32.994 0 0 1-.906-2.096c.405-.69.79-1.305 1.156-1.834.318-.46.612-.86.883-1.198.09-.111.177-.213.262-.305l.019-.022zm-8.522-.016l.018.022c.085.092.172.194.262.305.27.337.564.738.882 1.198.367.529.752 1.144 1.157 1.834a32.877 32.877 0 0 1-.907 2.096 28.8 28.8 0 0 1-.818 1.62c-.748 1.282-1.293 1.776-2.106 1.776-.587 0-.918-.135-1.18-.502a1.477 1.477 0 0 1-.15-.267 2.633 2.633 0 0 1-.142-.408 5.349 5.349 0 0 1-.15-1.35c0-1.594.54-3.344 1.302-4.587.623-1.017 1.274-1.682 2.03-1.745z" />
  </svg>
);

