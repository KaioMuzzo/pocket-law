# Pocket Law

A mobile-friendly quiz to study for my **Digital Law** exam on the go — made to be used on the bus.

Built with plain HTML, JavaScript and Tailwind CSS. All questions live in a single JSON file.

> The questions are written in Portuguese, since they come from my class notes.

## Features

- Multiple choice questions with instant feedback (green for correct, red for wrong)
- Score counter
- Question deck: every question appears once before any repeats
- Wrong answers are generated automatically from related questions on the same topic

## Running locally

Browsers block `fetch` on files opened directly (`file://`), so the project needs a local server. Inside the project folder:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000`. The VS Code **Live Server** extension works too.

## Adding questions

Questions are stored in `questions.json`. Each question looks like this:

```json
{
  "lesson": "Contratos",
  "topic": "Classificação dos contratos",
  "question": "Um contrato com o seu nome, em que você não pode ser substituído, é:",
  "answer": "Personalíssimo"
}
```

| Field          | Required | Purpose                                                                |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `lesson`       | yes      | The class the question comes from                                      |
| `topic`        | yes      | A small group of related concepts — wrong answers are borrowed from it |
| `question`     | yes      | The question text                                                      |
| `answer`       | yes      | The correct answer                                                     |
| `wrongAnswers` | no       | Custom wrong answers, used instead of borrowing from the topic         |

**Tip:** keep topics small and answers in a similar format inside the same topic, so the borrowed wrong answers stay believable. Use `wrongAnswers` when a question has no good "siblings".
