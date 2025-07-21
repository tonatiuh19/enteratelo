import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Share2,
  BookmarkPlus,
  MessageCircle,
  Eye,
  Clock,
  User,
  Calendar,
  Twitter,
  Facebook,
  Instagram,
  ChevronLeft,
  Send,
  ThumbsUp,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockArticles, categories } from "@/services/data.service";
import { Layout } from "@/components/Layout/Layout";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { articleId } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Find the article (in a real app, this would fetch from API)
  const article =
    mockArticles.find((a) => a.id === articleId) || mockArticles[0];
  const category = categories.find((c) => c.id === article.category);
  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const articleContent = `
    <p>En una fría noche de noviembre en el Santiago Bernabéu, más de 80,000 espectadores fueron testigos de algo mucho más grande que un clásico entre Real Madrid y Barcelona. Era una ventana al futuro del deporte. Mientras Messi y Mbappé se enfrentaban sobre el césped, la tecnología que experimentan el futuro del deporte. Mientras Messi y Mbappé se enfrentaban sobre el césped, la verdadera revolución sucedía en las gradas, en los móviles de los aficionados y en los centros de datos que alimentan la nueva era del entretenimiento deportivo.</p>
    
    <h2>📱 Lo Que Revolucionó en este Artículo</h2>
    
    <ul>
      <li>🚀 <strong>Tecnología en los estadios</strong> revolucionó las experiencias de entretenimiento del aficionado</li>
      <li>🎯 <strong>Los aficionados modernos</strong> que conocen las estadísticas más avanzadas</li>
      <li>📊 <strong>Ejemplos reales de implementación</strong> en venues emblemáticos</li>
      <li>🔮 <strong>El futuro de los estadios inteligentes</strong> y las nuevas experiencias</li>
    </ul>
    
    <h2>🚀G: La Infraestructura que lo Hace Posible</h2>
    
    <p>La verdadera revolución comenzó con el despliegue masivo de redes 5G en estadios deportivos. Con velocidades de hasta 10 gigabits por segundo, la latencia se redujo a menos de 1 milisegundo, lo cual permite una interacción casi instantánea entre dispositivos. Con velocidades que alcanzan los <strong>10 Gbps</strong> y latencias menores a <strong>1ms</strong>, se abre un mundo de posibilidades:</p>
    
    <blockquote>
      <p><strong>50% de los espectadores</strong> utilizan actualmente aplicaciones interactivas durante eventos deportivos, y se espera que esta cifra alcance el <strong>85% en 2025</strong>.</p>
    </blockquote>

    <h3>Capacidades Revolucionarias del 5G en Estadios:</h3>
    
    <ul>
      <li><strong>Realidad Aumentada en Tiempo Real:</strong> Los espectadores pueden ver superposiciones digitales con información detallada de jugadores, estadísticas en vivo y repeticiones desde múltiples ángulos directamente en sus dispositivos.</li>
      <li><strong>Interactividad Social Masiva:</strong> Participación en encuestas, juegos y experiencias colaborativas con otros espectadores sin comprometer la conectividad.</li>
      <li><strong>Streaming Multi-Ángulo:</strong> Acceso a 6 ángulos diferentes de cámara desde dispositivos personales sin buffering.</li>
      <li><strong>Traducción Instantánea:</strong> Comentarios en tiempo real en más de 40 idiomas.</li>
    </ul>

    <h2>🧠 Inteligencia Artificial: El Cerebro del Estadio Inteligente</h2>
    
    <p>Los sistemas de IA procesan más de <strong>2.5 millones de puntos de datos por partido</strong>, desde la velocidad de cada jugador hasta patrones de movimiento de la multitud, creando una matriz de experiencias personalizadas. Esta tecnología está redefiniendo la manera en que experimentamos los deportes.</p>
    
    <p>El <strong>57% de los estadios</strong> más avanzados ya utilizan algoritmos de machine learning que pueden predecir con un <strong>78% de precisión</strong> cuál será la siguiente jugada más importante, mejorando significativamente la experiencia del espectador.</p>

    <blockquote>
      <p>"No estamos simplemente digitalizando el deporte; estamos creando una nueva dimensión de entretenimiento donde cada aficionado se convierte en analista, comentarista y protagonista de su propia experiencia." - Dr. Elena Martín, MIT Sports Technology Lab</p>
    </blockquote>

    <h2>🌟 El Futuro es Ahora</h2>
    
    <p>Varios estadios pioneros ya han implementado estas tecnologías con resultados impresionantes. El aumento en la satisfacción de los espectadores y el engagement durante los eventos ha sido notable.</p>
    
    <p>La próxima fase incluirá la integración de inteligencia artificial para predicciones más precisas y experiencias aún más personalizadas. El deporte del futuro será más interactivo, más inmersivo y más emocionante que nunca.</p>
  `;

  return (
    <Layout showBreakingNews={false}>
      <div className="article-page">
        {/* Article Header */}
        <div className="bg-gradient-to-b from-muted/30 to-background">
          <div className="article-page__container">
            <div className="max-w-4xl mx-auto">
              <div className="article-page__breadcrumb">
                <Link
                  to="/"
                  className="article-page__breadcrumb-link flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Inicio</span>
                </Link>
                <span className="text-muted-foreground mx-2">•</span>
                <Link
                  to={`/categoria/${category?.id}`}
                  className="article-page__breadcrumb-link text-muted-foreground hover:text-primary"
                >
                  {category?.name}
                </Link>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">Artículo</span>
              </div>

              <div className="article-page__header">
                <Badge
                  className={cn(
                    "article-page__category",
                    category?.color || "bg-primary",
                  )}
                >
                  <span className="mr-1">{category?.icon}</span>
                  {category?.name}
                </Badge>

                <h1 className="article-page__title">{article.title}</h1>

                <p className="article-page__excerpt">{article.excerpt}</p>

                <div className="article-page__meta">
                  <div className="article-page__meta-left">
                    <div className="article-page__meta-item">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="article-page__meta-item">
                      <Calendar className="h-4 w-4" />
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="article-page__meta-item">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime} min de lectura</span>
                    </div>
                    <div className="article-page__meta-item">
                      <Eye className="h-4 w-4" />
                      <span>{article.views.toLocaleString()} vistas</span>
                    </div>
                  </div>

                  <div className="article-page__meta-right">
                    <Button
                      variant={liked ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLiked(!liked)}
                    >
                      <Heart
                        className={cn("h-4 w-4 mr-2", liked && "fill-current")}
                      />
                      {article.likes + (liked ? 1 : 0)}
                    </Button>
                    <Button
                      variant={bookmarked ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBookmarked(!bookmarked)}
                    >
                      <BookmarkPlus
                        className={cn("h-4 w-4", bookmarked && "fill-current")}
                      />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="article-page__container">
          <div className="article-page__grid">
            {/* Hero Image Section - Matching Grid Width */}
            <div className="article-page__hero-section">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-page__hero-image"
              />

              {/* Image Description */}
              <div className="article-page__image-caption">
                <p className="text-sm text-muted-foreground italic text-center">
                  En una fría noche de noviembre en el Santiago Bernabéu, más de
                  80,000 espectadores fueron testigos de algo mucho más grande
                  que un clásico entre Real Madrid y Barcelona.
                </p>
              </div>
            </div>

            {/* Sidebar - positioned next to hero */}
            <div className="article-page__sidebar">
              {/* Author Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {article.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{article.author}</h3>
                      <p className="text-sm text-muted-foreground">
                        Periodista
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Especialista en tecnología deportiva y innovación en
                    estadios.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Seguir autor
                  </Button>
                </CardContent>
              </Card>

              {/* Articles Relacionados Sidebar */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Artículos Relacionados</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.slice(0, 3).map((relatedArticle, index) => (
                    <div key={relatedArticle.id} className="space-y-3">
                      <Link
                        to={`/articulo/${relatedArticle.id}`}
                        className="group block"
                      >
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded">
                            <img
                              src={relatedArticle.imageUrl}
                              alt={relatedArticle.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedArticle.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                              <span>{relatedArticle.author}</span>
                              <span>•</span>
                              <span>{relatedArticle.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < relatedArticles.slice(0, 3).length - 1 && (
                        <Separator />
                      )}
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link
                      to={`/categoria/${category?.id}`}
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      <span>Ver más de {category?.name}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Subscription */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibe los mejores artículos en tu email
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-3">
                    <Input placeholder="tu@email.com" type="email" />
                    <Button className="w-full" size="sm">
                      Suscribirse
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Tags Populares</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tecnología",
                      "Deportes",
                      "Innovación",
                      "Estadios",
                      "Futuro",
                      "IA",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content - Full Width Below Hero */}
          <div className="article-page__content-grid">
            <div className="article-page__main">
              <div
                className="article-page__content"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              <div className="article-page__tags">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="article-page__share-buttons">
                <span className="font-medium">Compartir artículo:</span>
                <div className="article-page__social-share">
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="article-page__comments">
                <h3 className="article-page__comments-title">
                  Comentarios ({mockComments.length})
                </h3>

                <Card className="article-page__comment-form">
                  <CardContent className="pt-6">
                    <h4 className="article-page__comment-form-title">
                      Deja tu comentario
                    </h4>
                    <form onSubmit={handleSubmitComment}>
                      <div className="article-page__comment-form-grid">
                        <Input placeholder="Tu nombre" required />
                        <Input placeholder="Tu email" type="email" required />
                      </div>
                      <Textarea
                        placeholder="Escribe tu comentario..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="article-page__comment-form-textarea"
                        required
                      />
                      <Button type="submit" className="w-fit">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar comentario
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="article-page__comment-list">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="article-page__comment">
                      <div className="article-page__comment-header">
                        <Avatar>
                          <AvatarFallback>
                            {comment.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="article-page__comment-author">
                            {comment.author}
                          </span>
                          <div className="article-page__comment-time">
                            {comment.timestamp}
                          </div>
                        </div>
                      </div>
                      <p className="article-page__comment-content">
                        {comment.content}
                      </p>
                      <div className="article-page__comment-actions">
                        <button className="article-page__comment-action">
                          <ThumbsUp className="h-4 w-4" />
                          {comment.likes}
                        </button>
                        <button className="article-page__comment-action">
                          <MessageCircle className="h-4 w-4" />
                          Responder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              <div className="article-page__related-articles">
                <h3 className="article-page__related-title">
                  Artículos Relacionados
                </h3>
                <div className="article-page__related-grid">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/articulo/${relatedArticle.id}`}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {relatedArticle.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mockComments = [
  {
    id: "1",
    author: "Carlos Mendoza",
    content:
      "Excelente artículo. Muy bien explicado el impacto de estas tecnologías en el deporte moderno. ¿Sabéis cuándo llegará el 5G al Wanda Metropolitano?",
    timestamp: "Hace 2 horas",
    likes: 12,
  },
  {
    id: "2",
    author: "Miguel Santos",
    content:
      "Me parece increíble cómo la tecnología está transformando la experiencia en los estadios. El año pasado estuve en el Camp Nou y ya se nota la diferencia con las aplicaciones.",
    timestamp: "Hace 3 horas",
    likes: 8,
  },
  {
    id: "3",
    author: "Ana García",
    content:
      "Como desarrolladora que trabaja en sport-tech, puedo confirmar que esto es solo el comienzo. La IA va a revolucionar completamente cómo entendemos el deporte.",
    timestamp: "Hace 5 horas",
    likes: 15,
  },
  {
    id: "4",
    author: "Roberto Fernández",
    content:
      "¡Fascinante! Me encanta ver cómo la tecnología mejora la experiencia del aficionado. ¿Creéis que esto llegará también a estadios de Segunda División?",
    timestamp: "Hace 6 horas",
    likes: 6,
  },
];
