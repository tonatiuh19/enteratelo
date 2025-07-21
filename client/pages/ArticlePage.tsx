import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Reply,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockArticles, categories } from "@/services/data.service";
import { Layout } from "@/components/shared";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Carlos Mendoza",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    content:
      "Excelente artículo. Muy bien explicado el impacto de estas tecnologías en el deporte moderno.",
    timestamp: "Hace 2 horas",
    likes: 12,
    replies: [
      {
        id: "1-1",
        author: "Ana García",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=40&h=40&fit=crop&crop=face",
        content:
          "Totalmente de acuerdo. El futuro del deporte será fascinante.",
        timestamp: "Hace 1 hora",
        likes: 5,
      },
    ],
  },
  {
    id: "2",
    author: "Miguel Santos",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    content:
      "Me parece increíble cómo la tecnología está transformando la experiencia en los estadios. ¿Cuándo podremos ver esto en más lugares?",
    timestamp: "Hace 3 horas",
    likes: 8,
  },
  {
    id: "3",
    author: "Laura Pérez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    content:
      "La realidad aumentada va a cambiar completamente cómo vemos los partidos. Espero que llegue pronto a mi ciudad.",
    timestamp: "Hace 4 horas",
    likes: 15,
  },
];

export default function ArticlePage() {
  const { articleId } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  // Find the article (in a real app, this would fetch from API)
  const article =
    mockArticles.find((a) => a.id === articleId) || mockArticles[0];
  const category = categories.find((c) => c.id === article.category);
  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        );
        break;
    }
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Usuario Actual",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        content: newComment,
        timestamp: "Ahora",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const articleContent = `
        <div class="article-intro">
      <p class="text-xl leading-relaxed font-light text-gray-700 dark:text-gray-300 mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:mt-1">En una fría noche de noviembre en el Santiago Bernabéu, más de 80,000 espectadores no solo presenciaron un clásico entre Real Madrid y Barcelona, sino que experimentaron el futuro del deporte. Mientras Messi driblaba hacia el área, los aficionados podían acceder instantáneamente a su velocidad de carrera, la trayectoria de la pelota en 3D y estadísticas comparativas con jugadas históricas, todo desde sus dispositivos móviles.</p>

      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p class="text-lg font-medium text-primary mb-2">🎯 Lo que descubrirás en este artículo:</p>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Cómo la tecnología 5G está revolucionando la experiencia en estadios</li>
          <li>• Los datos sorprendentes que procesan los estadios inteligentes</li>
          <li>• Ejemplos reales de implementación en venues icónicos</li>
          <li>• El futuro de la interacción deportiva</li>
        </ul>
      </div>

      <p class="text-lg text-center font-semibold text-primary border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
        ✨ Bienvenidos al estadio inteligente del siglo XXI ✨
      </p>
    </div>

    <h2>🏟️ La Revolución Tecnológica que está Transformando el Deporte</h2>
    
    <p>Los estadios modernos ya no son simplemente lugares donde se celebran eventos deportivos. Se han convertido en ecosistemas tecnológicos complejos que ofrecen experiencias inmersivas y personalizadas a los espectadores.</p>
    
    <p>La <strong>realidad aumentada</strong> permite a los aficionados acceder a estadísticas en tiempo real, repeticiones instantáneas y contenido exclusivo simplemente apuntando su dispositivo móvil hacia el campo. Esta tecnología está redefiniendo la manera en que consumimos el deporte.</p>

    <h2>🚀 5G: La Infraestructura que lo Hace Posible</h2>
    
        <p>La verdadera revolución comenzó con el despliegue masivo de redes 5G en recintos deportivos. Con velocidades de hasta <strong>10 gigabits por segundo</strong> y latencia inferior a 1 milisegundo, la conectividad 5G ha eliminado las barreras técnicas que limitaban la experiencia digital en estadios.</p>

    <p>El Wembley Stadium de Londres, tras su actualización 5G en 2023, reportó que el <strong>89% de los espectadores</strong> utilizan activamente aplicaciones interactivas durante los partidos, comparado con apenas el 23% en la era 4G.</p>

    <h3>Capacidades Revolucionarias del 5G en Estadios:</h3>
    
    <ul>
            <li><strong>Transmisión Ultra HD sin Buffer:</strong> Videos 8K con cero interrupciones, incluso con 80,000 usuarios conectados simultáneamente</li>
      <li><strong>Realidad Aumentada Fluida:</strong> Superposición de gráficos complejos sin lag perceptible</li>
      <li><strong>Interacción Social Masiva:</strong> Participación en encuestas, juegos y redes sociales sin saturación de red</li>
      <li><strong>Streaming Multicámara:</strong> Acceso a 16 ángulos diferentes de cámara desde el dispositivo personal</li>
      <li><strong>Traducción Instantánea:</strong> Comentarios en tiempo real en más de 40 idiomas</li>
    </ul>

    <h2>📊 Inteligencia Artificial: El Cerebro del Estadio Inteligente</h2>
    
        <p>Los sistemas de IA procesan más de <strong>7.2 millones de puntos de datos por partido</strong>, desde la velocidad de cada jugador hasta patrones de movimiento de la multitud. El Juventus Stadium utiliza algoritmos de machine learning que predicen con un <strong>87% de precisión</strong> qué áreas del estadio experimentarán mayor congestión durante el descanso.</p>
    
    <blockquote>
            "No estamos simplemente digitalizando el deporte; estamos creando una nueva dimensión de entretenimiento donde cada aficionado se convierte en analista, comentarista y protagonista de su propia experiencia." - <strong>Dr. Elena Martínez</strong>, Directora del Instituto de Innovación Deportiva de Barcelona
    </blockquote>

    <h2>El Futuro es Ahora</h2>
    
    <p>Varios estadios pioneros ya han implementado estas tecnologías con resultados impresionantes. El aumento en la satisfacción de los espectadores y el engagement durante los eventos ha sido notable.</p>
    
    <p>La próxima fase incluirá la integración de inteligencia artificial para predicciones más precisas y experiencias aún más personalizadas. El deporte del futuro será más interactivo, más inmersivo y más emocionante que nunca.</p>
  `;

  return (
    <Layout showBreakingNews={false}>
      {/* Article Header */}
      <div className="bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Volver al inicio</span>
              </Link>
            </div>

            <div className="space-y-4">
              <Badge className={cn("w-fit", category?.color || "bg-primary")}>
                <span className="mr-1">{category?.icon}</span>
                {category?.name}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.publishedAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min de lectura</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{article.views.toLocaleString()} vistas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden mb-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Caption - Now outside the image */}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-1">
              Estadio moderno con tecnología avanzada integrada
            </p>
            <p className="text-xs text-muted-foreground">
              Foto: Unsplash | Tecnología deportiva
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - All aligned with max-w-4xl */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-3">
              <div className="max-w-none">
                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none mb-8
                    [&_.article-intro]:mb-12
                    [&_.article-intro_p]:text-xl [&_.article-intro_p]:leading-relaxed [&_.article-intro_p]:font-light
                    [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:text-gray-900 [&_h2]:dark:text-white
                    [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-6 [&_h3]:text-gray-800 [&_h3]:dark:text-gray-200
                    [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-4
                    [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-6 [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-blue-50 [&_blockquote]:to-purple-50 [&_blockquote]:dark:from-blue-900/30 [&_blockquote]:dark:to-purple-900/30 [&_blockquote]:rounded-xl [&_blockquote]:p-8 [&_blockquote]:mb-8
                    [&_ul]:space-y-4 [&_ul]:mb-8
                    [&_li]:text-base [&_li]:leading-relaxed
                    [&_strong]:text-primary [&_strong]:font-semibold
                    [&_.text-center]:py-8
                    article-content"
                  dangerouslySetInnerHTML={{ __html: articleContent }}
                />

                {/* Article Tags */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    ETIQUETAS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between py-6 border-y">
                  <div className="flex items-center space-x-4">
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
                        className={cn(
                          "h-4 w-4 mr-2",
                          bookmarked && "fill-current",
                        )}
                      />
                      Guardar
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground mr-2">
                      Compartir:
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="my-8">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=64&h=64&fit=crop&crop=face" />
                        <AvatarFallback>
                          {article.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {article.author}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          Periodista especializada en tecnología deportiva con
                          más de 10 años de experiencia. Ha cubierto múltiples
                          Olimpiadas y Mundiales, enfocándose en la innovación
                          tecnológica en el deporte.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Twitter className="h-4 w-4 mr-2" />
                            Seguir
                          </Button>
                          <Button variant="outline" size="sm">
                            Ver más artículos
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Comentarios ({comments.length})
                  </h2>

                  {/* Add Comment Form */}
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Comparte tu opinión sobre este artículo..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {newComment.length}/500 caracteres
                          </span>
                          <Button
                            onClick={handleComment}
                            disabled={!newComment.trim()}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Comentar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className="flex space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>
                              {comment.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">
                                  {comment.author}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="h-3 w-3 mr-1" />
                                Responder
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && (
                          <div className="ml-14 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-4">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={reply.avatar} />
                                  <AvatarFallback>
                                    {reply.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted/30 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-medium text-xs">
                                        {reply.author}
                                      </h4>
                                      <span className="text-xs text-muted-foreground">
                                        {reply.timestamp}
                                      </span>
                                    </div>
                                    <p className="text-xs">{reply.content}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-1"
                                  >
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {reply.likes}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Artículos Relacionados</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/articulo/${relatedArticle.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
                  ))}
                  <div className="pt-2 border-t">
                    <Link
                      to={`/categoria/${article.category}`}
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      <span>Ver más de {category?.name}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">📧 Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    No te pierdas nuestros últimos artículos
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input placeholder="tu@email.com" />
                    <Button className="w-full">Suscribirse</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Advertisement */}
              <Card className="border-dashed border-2 border-muted-foreground/20">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📢</span>
                    </div>
                    <p className="text-sm">Espacio Publicitario</p>
                    <p className="text-xs">Anúnciate aquí</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
