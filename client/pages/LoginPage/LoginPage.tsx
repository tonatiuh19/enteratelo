import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  loginUser,
  registerUser,
  validateSessionCode,
} from "@/store/actions/authActions";
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  selectUser,
  selectCodeSent,
  selectPendingEmail,
} from "@/store/selectors/authSelectors";
import { AuthActions } from "@/store/reducers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  PenTool,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/Layout/Layout";
import "./LoginPage.css";
import { setGlobalLoading } from "@/store/actions";

// Validation schemas
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
});

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre completo es requerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email profesional es requerido"),
  bio: Yup.string()
    .min(50, "La biografía debe tener al menos 50 caracteres")
    .max(300, "La biografía no puede exceder 300 caracteres")
    .required("Una breve biografía es requerida"),
});

const verifyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .required("El código de verificación es requerido")
    .length(6, "El código debe tener 6 caracteres"),
});

export default function LoginPage() {
  const [formMode, setFormMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const codeSent = useAppSelector(selectCodeSent);
  const pendingEmail = useAppSelector(selectPendingEmail);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if authenticated - check both immediately and when auth state changes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/author/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Clear errors when switching form modes
  useEffect(() => {
    if (error) {
      dispatch(AuthActions.clearError());
    }
  }, [formMode, dispatch]);

  // Clear registration success when switching modes
  useEffect(() => {
    setRegistrationSuccess(false);
  }, [formMode]);

  // Early return if user is authenticated - show loading or redirect
  if (isAuthenticated && !isLoading) {
    return (
      <Layout showBreakingNews={false}>
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-page__loading-redirect">
              <p>Ya estás autenticado. Redirigiendo al dashboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const initialValues = {
    name: "",
    email: "",
    bio: "",
    code: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    try {
      dispatch(setGlobalLoading(true));

      if (formMode === "login" && !codeSent) {
        // First step: Send verification code
        await dispatch(loginUser({ email: values.email }));
      } else if (formMode === "login" && codeSent) {
        // Second step: Verify code
        await dispatch(
          validateSessionCode({
            email: pendingEmail!,
            code: values.code,
          }),
        );
      } else {
        // Register mode
        const result = await dispatch(
          registerUser({
            name: values.name,
            email: values.email,
            bio: values.bio,
          }),
        );

        // Check if registration was successful
        if (result.type === "auth/registerUser/fulfilled") {
          setRegistrationSuccess(true);
        }
      }
    } catch (error) {
      // Error is handled by Redux state
      console.error("Authentication error:", error);
    } finally {
      dispatch(setGlobalLoading(false));
      setSubmitting(false);
    }
  };

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
    setRegistrationSuccess(false);
    dispatch(AuthActions.clearError());
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Layout showBreakingNews={false}>
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__hero">
            <div className="login-page__hero-content">
              <h1 className="login-page__hero-title">
                Portal de Autores Creativos
              </h1>
              <p className="login-page__hero-description">
                Únete a nuestra plataforma exclusiva para escritores,
                periodistas y creadores de contenido. Comparte tus historias con
                el mundo.
              </p>
              <div className="login-page__hero-features">
                <div className="login-page__feature">
                  <div className="login-page__feature-icon">✍️</div>
                  <span>Publica tus Artículos</span>
                </div>
                <div className="login-page__feature">
                  <div className="login-page__feature-icon">�</div>
                  <span>Analytics Detallados</span>
                </div>
                <div className="login-page__feature">
                  <div className="login-page__feature-icon">💰</div>
                  <span>Monetiza tu Contenido</span>
                </div>
                <div className="login-page__feature">
                  <div className="login-page__feature-icon">🌟</div>
                  <span>Comunidad Premium</span>
                </div>
              </div>

              <div className="login-page__stats">
                <div className="login-page__stat">
                  <div className="login-page__stat-number">500+</div>
                  <div className="login-page__stat-label">Autores Activos</div>
                </div>
                <div className="login-page__stat">
                  <div className="login-page__stat-number">50K+</div>
                  <div className="login-page__stat-label">
                    Lectores Mensuales
                  </div>
                </div>
                <div className="login-page__stat">
                  <div className="login-page__stat-number">95%</div>
                  <div className="login-page__stat-label">Satisfacción</div>
                </div>
              </div>
            </div>
          </div>

          <div className="login-page__form-section">
            <Card className="login-page__card">
              <CardHeader className="login-page__card-header">
                <div className="login-page__logo">
                  <div className="login-page__logo-icon">
                    <span className="login-page__logo-text">E</span>
                  </div>
                  <span className="login-page__logo-title">Entérate.lo</span>
                </div>
                <CardTitle className="login-page__title">
                  {formMode === "login"
                    ? "Portal de Autores"
                    : "Únete como Autor"}
                </CardTitle>
                <p className="login-page__subtitle">
                  {formMode === "login"
                    ? "Accede a tu dashboard de escritor"
                    : "Comienza tu carrera como autor en Entérate.lo"}
                </p>
              </CardHeader>

              <CardContent className="login-page__card-content">
                <Formik
                  initialValues={initialValues}
                  validationSchema={
                    formMode === "login" && codeSent
                      ? verifyCodeSchema
                      : formMode === "login"
                        ? loginSchema
                        : registerSchema
                  }
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                  }) => (
                    <>
                      {error && (
                        <Alert
                          className="login-page__error"
                          variant="destructive"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      {registrationSuccess && (
                        <>
                          <Alert
                            className="login-page__success"
                            variant="default"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                              <strong>¡Registro enviado exitosamente!</strong>
                              <br />
                              Tu solicitud ha sido enviada. Te notificaremos por
                              email cuando tu perfil esté activo.
                            </AlertDescription>
                          </Alert>

                          <div className="login-page__success-actions">
                            <Button
                              onClick={() => navigate("/")}
                              className="login-page__back-btn"
                              variant="outline"
                            >
                              Volver al Inicio
                            </Button>
                          </div>
                        </>
                      )}

                      {!registrationSuccess && (
                        <Form className="login-page__form">
                          {formMode === "login" && codeSent && (
                            <>
                              <div className="login-page__code-sent-info">
                                <Alert
                                  className="login-page__info"
                                  variant="default"
                                >
                                  <Mail className="h-4 w-4" />
                                  <AlertDescription>
                                    Se ha enviado un código de verificación a{" "}
                                    <strong>{pendingEmail}</strong>. Ingresa el
                                    código para acceder a tu cuenta.
                                  </AlertDescription>
                                </Alert>
                              </div>

                              <div className="login-page__field">
                                <Label
                                  htmlFor="code"
                                  className="login-page__label"
                                >
                                  Código de Verificación
                                </Label>
                                <div className="login-page__input-wrapper">
                                  <Lock className="login-page__input-icon" />
                                  <Input
                                    id="code"
                                    name="code"
                                    type="text"
                                    placeholder="Ingresa el código de 6 dígitos"
                                    value={values.code}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="login-page__input"
                                    maxLength={6}
                                  />
                                </div>
                                <ErrorMessage
                                  name="code"
                                  component="div"
                                  className="login-page__error-message"
                                />
                              </div>
                            </>
                          )}

                          {formMode === "register" && (
                            <>
                              <div className="login-page__field">
                                <Label
                                  htmlFor="name"
                                  className="login-page__label"
                                >
                                  Nombre Completo
                                </Label>
                                <div className="login-page__input-wrapper">
                                  <User className="login-page__input-icon" />
                                  <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Tu nombre profesional"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="login-page__input"
                                  />
                                </div>
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="login-page__error-message"
                                />
                              </div>

                              <div className="login-page__field">
                                <Label
                                  htmlFor="bio"
                                  className="login-page__label"
                                >
                                  Biografía Profesional
                                </Label>
                                <div className="login-page__input-wrapper">
                                  <FileText className="login-page__input-icon login-page__input-icon--textarea" />
                                  <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Cuéntanos sobre tu experiencia, especialidad y lo que te apasiona escribir. Mínimo 50 caracteres."
                                    value={values.bio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="login-page__textarea"
                                    rows={4}
                                  />
                                </div>
                                <div className="login-page__bio-counter">
                                  {values.bio.length}/300 caracteres
                                </div>
                                <ErrorMessage
                                  name="bio"
                                  component="div"
                                  className="login-page__error-message"
                                />
                              </div>
                            </>
                          )}

                          {(formMode === "login" && !codeSent) ||
                          formMode === "register" ? (
                            <div className="login-page__field">
                              <Label
                                htmlFor="email"
                                className="login-page__label"
                              >
                                Email Profesional
                              </Label>
                              <div className="login-page__input-wrapper">
                                <Mail className="login-page__input-icon" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="tu.email@profesional.com"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="login-page__input"
                                />
                              </div>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="login-page__error-message"
                              />
                            </div>
                          ) : null}

                          {formMode === "login" && !codeSent && (
                            <div className="login-page__forgot-password">
                              <Link
                                to="/forgot-password"
                                className="login-page__forgot-link"
                              >
                                ¿Olvidaste tu contraseña?
                              </Link>
                            </div>
                          )}

                          <Button
                            type="submit"
                            className="login-page__submit-btn"
                            disabled={isSubmitting || isLoading}
                          >
                            {isSubmitting || isLoading
                              ? "Procesando..."
                              : formMode === "login" && codeSent
                                ? "Verificar Código"
                                : formMode === "login"
                                  ? "Enviar Código"
                                  : "Crear Cuenta de Autor"}
                          </Button>
                        </Form>
                      )}
                    </>
                  )}
                </Formik>

                {!registrationSuccess && (
                  <>
                    <div className="login-page__switch-mode">
                      <span>
                        {formMode === "login"
                          ? "¿Nuevo en nuestra plataforma?"
                          : "¿Ya eres parte del equipo?"}
                      </span>
                      <button
                        type="button"
                        onClick={toggleFormMode}
                        className="login-page__switch-btn"
                      >
                        {formMode === "login"
                          ? "Solicitar Acceso"
                          : "Iniciar sesión"}
                      </button>
                    </div>

                    {formMode === "register" && (
                      <div className="login-page__author-note">
                        <p className="login-page__note-text">
                          💡 <strong>Nota:</strong> Todas las cuentas de autor
                          pasan por un proceso de revisión para mantener la
                          calidad de nuestra plataforma. Te notificaremos por
                          email una vez aprobada tu solicitud.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
