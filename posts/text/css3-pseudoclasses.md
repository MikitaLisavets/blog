<time>2014-01-24</time>
# Псевдоклассы в CSS

Сегодня использование возможностей CSS3 все больше становится нормой благодаря улучшающейся поддержке браузеров, что не может не радовать. Тем не менее, большая категория верстальщиков консервативно относятся к внедрению такого рода вкусностей в повседневную верстку. И одной из таких штук является спецификация **CSS3 Selectors**.

Использование этой спецификации зачастую ограничивается поиском первого, последнего либо n-го дочернего элемента, но там есть гораздо больше интересных вещей.

Забегая вперед хочу сказать пару слов о поддержке всего того, о чем я буду рассказывать дальше. Она довольно неплохая: **ie9+** ( в 7 и 8 частичная, но так же есть js-библиотека о [selectivizr](http://selectivizr.com/) для почти полной поддержки ), **FF 3.5+, Crome 4+, Safari 3.2+, Opera 9.6+** и **все** мобильные браузеры. Ну а теперь чуть более подробнее о CSS3 селекторах:

## Ингредиенты

| Селектор | Описание |
|-|-|
| **:checked** | С его помощью мы, в html-документе, можем находить элементы checkbox и radio в состоянии checked. |
| **:default** | С его помощью мы можем поменять стиль кнопки, которая в текущей форме является кнопкой по умолчанию. <br> *«По-умолчанию» считается первый input с типом submit в разметке.* |
| **:disabled** **:enabled** | С помощью псевдо-класса disabled мы можем указать стили для тех элементов, которые находятся в выключенном состоянии. Соответственно, псевдо-класс enabled используем для поиска элементов во включенном состоянии. |
| **:empty**  | С помощью этого псевдо-класса мы можем получить элементы, которые не содержат в себе дочерние элементы или текст. |
| **:first-of-type** **:last-of-type** | С помощью этих псевдо-классов мы можем получить в списке дочерних элементов первый и последний элемент соответственно. <br> *Применяется к элементу, который мы хотим получить, а не к родительскому элементу.* |
| **:indeterminate** | С помощью этого псевдо-класса мы можем указать, что собираемся получить доступ к элементам checkbox, которые находятся в неопределенном состоянии. <br> *«Неопределенное состояние» можно задать с помощью javascript кода.* |
| **:valid** **:invalid** | Эти псевдо-классы используются для указания стилей валидным и не валидным элементам форм, у которых задан тип (url, email, number, etc.) |
| **:first-child** **:last-child** | С помощью этих двух псевдо-классов мы может получить доступ к первому и последнему дочернему элементу соответственно. <br> *Применяется к родительскому элементу.* |
| **:not** | Псевдо-класс not позволяет указать то, что не должен содержать в себе селектор. <br>:not(h1) — все элементы, которые не являются <br> h1 input:not([type=’button’]) — все input, которые не являются button |
| **:nth-of-child** | Этот псевдо-класс позволяет получить доступ к элементам по расположению элемента в деревe DOM. <br> *Применяется к элементу, который мы хотим получить.* <br> odd — нечетный <br> even — четный |
| **:nth-of-last-child** | Аналогично nth-of-child, только выборка идет с конца дерева DOM. |
| **:nth-of-type** | Отличие этого псевдо-класса от nth-of-child состоит в том, что nth-of-type считает элементы того типа, который мы указываем перед этим псевдо-классом, а nth-of-child же считает все элементы и применят стили, если указанный элемент соответствует найденному. <br>
| | `<p>Paragraph 1</p>` <br> `<h1>Header</h1>` <br> `<p>Paragraph 2</p>` |
| | p:nth-of-child(2) — не применит стили ни к какому элементу. <br> p:nth-of-type(2) — применит стили к 2-му параграфу. |
| **:only-child** | С помощью этого псевдо-класса можно получить элемент, который является единственным элементом для родительского элемента. |
| **:optional** **:required** | С помощью этих псевдо-классов можно получить элементы формы, которые являются опциональными или обязательными соответственно. <br> *Используется атрибут required.* |
| **:read-only** **:read-write** | С помощью псевдо-класса read-only мы можем получить элемент, который имеет атрибут readonly, а с помощью read-write, соответственно, элемент, который мы можем изменять. |
| **:root** | С помощью псевдо-класса root мы получаем ссылку на корневой элемент html |

## И на сладкое

**div[class^=’some’]** — Позволяет найти div, атрибут class которого начинается с текста «some»  
**div[class$=’some’]** — Позволяет найти div, атрибут class которого заканчивается на текст «some»  
**div[class\*=’some’]** — Позволяет найти div, атрибут class которого содержит текст «some»  
**div[class~=’some’]** — Позволяет найти div, атрибут class которого содержит текст «some», отделенный пробелом  
**div[class|=’some’]** — Позволяет найти div, атрибут class которого содержит текст «some», отделенный тире

**div p** — Указывает на все p внутри div при любом уровне вложенности  
**div > p** — Указывает непосредственно на дочерний элемент p div’а  
**div + p** — Указывает на p следующий непосредственно сразу после div  
**div ~ p** — Указывает на все p следующие после div
