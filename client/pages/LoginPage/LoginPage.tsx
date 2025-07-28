import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser, registerUser } from "@/store/actions/authActions";
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "@/store/selectors/authSelectors";
import { clearError } from "@/store/reducers/authSlice";
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
} from "lucide-react";
import { Layout } from "@/components/Layout/Layout";
import "./LoginPage.css";

// Validation schemas
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre completo es requerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email profesional es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/(?=.*[a-z])/, "Debe contener al menos una letra minúscula")
    .matches(/(?=.*[A-Z])/, "Debe contener al menos una letra mayúscula")
    .matches(/(?=.*\d)/, "Debe contener al menos un número")
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
  bio: Yup.string()
    .min(50, "La biografía debe tener al menos 50 caracteres")
    .max(300, "La biografía no puede exceder 300 caracteres")
    .required("Una breve biografía es requerida"),
  specialty: Yup.string().required("Selecciona tu especialidad"),
});

export default function LoginPage() {
  const [formMode, setFormMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when switching form modes
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [formMode, dispatch, error]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    specialty: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    try {
      if (formMode === "login") {
        await dispatch(
          loginUser({
            email: values.email,
            password: values.password,
          }),
        ).unwrap();
        console.log("Acceso concedido al portal de autores!");
      } else {
        await dispatch(
          registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
            specialty: values.specialty,
            bio: values.bio,
          }),
        ).unwrap();
        console.log(
          "Solicitud de autor enviada! Te notificaremos cuando sea aprobada.",
        );
      }
    } catch (error) {
      // Error is handled by Redux state
      console.error("Authentication error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFormMode = () => {
    setFormMode((prev) => (prev === "login" ? "register" : "login"));
    dispatch(clearError());
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
                    formMode === "login" ? loginSchema : registerSchema
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

                      <Form className="login-page__form">
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
                                htmlFor="specialty"
                                className="login-page__label"
                              >
                                Especialidad
                              </Label>
                              <div className="login-page__input-wrapper">
                                <PenTool className="login-page__input-icon" />
                                <Select
                                  name="specialty"
                                  value={values.specialty}
                                  onValueChange={(value) =>
                                    handleChange({
                                      target: { name: "specialty", value },
                                    })
                                  }
                                >
                                  <SelectTrigger className="login-page__input">
                                    <SelectValue placeholder="Selecciona tu especialidad" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="journalism">
                                      Periodismo
                                    </SelectItem>
                                    <SelectItem value="politics">
                                      Política
                                    </SelectItem>
                                    <SelectItem value="sports">
                                      Deportes
                                    </SelectItem>
                                    <SelectItem value="technology">
                                      Tecnología
                                    </SelectItem>
                                    <SelectItem value="entertainment">
                                      Entretenimiento
                                    </SelectItem>
                                    <SelectItem value="business">
                                      Negocios
                                    </SelectItem>
                                    <SelectItem value="health">
                                      Salud
                                    </SelectItem>
                                    <SelectItem value="science">
                                      Ciencia
                                    </SelectItem>
                                    <SelectItem value="lifestyle">
                                      Estilo de Vida
                                    </SelectItem>
                                    <SelectItem value="opinion">
                                      Opinión
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <ErrorMessage
                                name="specialty"
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

                        <div className="login-page__field">
                          <Label htmlFor="email" className="login-page__label">
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

                        <div className="login-page__field">
                          <Label
                            htmlFor="password"
                            className="login-page__label"
                          >
                            Contraseña
                          </Label>
                          <div className="login-page__input-wrapper">
                            <Lock className="login-page__input-icon" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Tu contraseña"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="login-page__input"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("password")
                              }
                              className="login-page__password-toggle"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="login-page__error-message"
                          />
                        </div>

                        {formMode === "register" && (
                          <div className="login-page__field">
                            <Label
                              htmlFor="confirmPassword"
                              className="login-page__label"
                            >
                              Confirmar Contraseña
                            </Label>
                            <div className="login-page__input-wrapper">
                              <Lock className="login-page__input-icon" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirma tu contraseña"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="login-page__input"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  togglePasswordVisibility("confirmPassword")
                                }
                                className="login-page__password-toggle"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="login-page__error-message"
                            />
                          </div>
                        )}

                        {formMode === "login" && (
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
                            : formMode === "login"
                              ? "Acceder al Portal"
                              : "Crear Cuenta de Autor"}
                        </Button>
                      </Form>
                    </>
                  )}
                </Formik>

                <div className="login-page__divider">
                  <span>o</span>
                </div>

                <div className="login-page__social-login">
                  <Button variant="outline" className="login-page__social-btn">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuar con Google Workspace
                  </Button>
                </div>

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
                      💡 <strong>Nota:</strong> Todas las cuentas de autor pasan
                      por un proceso de revisión para mantener la calidad de
                      nuestra plataforma. Te notificaremos por email una vez
                      aprobada tu solicitud.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
