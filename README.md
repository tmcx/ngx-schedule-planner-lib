# ngx-schedule-planner

### Description

`ngx-schedule-planner` is an Angular package designed to facilitate the creation and visualization of schedules in web applications. It provides flexible and highly customizable components that allow users to view schedules intuitively.

<img src="https://i.ibb.co/MS5YbFQ/img1.jpg">

### Features

- **Three Calendar Modes:** Supports three calendar modes: daily, weekly, and monthly.
- **Content Navigation by Directions:** Allows navigation within the content using directional navigation.
- **Date Selection Navigation Using Calendar:** Enables navigation by selecting a date using the calendar.
- **Grouped Activities Display:** Displays activities grouped by group and user.
- **Profiles Filtering and Sorting:** Filters and sorts profiles by tags, username, or group name.
- **Activity Filtering by Color:** Filters activities by color.
- **Define Time Range:** Ability to define a time range.
- **Change Reference Date:** Allows changing the reference date.
- **Customizable Design Using Themes:** Customize the design using themes.
- **Click Events Listening for Adding Activity:** Listens to click events when attempting to add an activity.
- **Range Selection Event Listening for Groups:** Listens to range selection events for groups (useful for displaying a modal for activity creation).
- **Expanded View with Collapsible Sidebar:** Provides an expanded view by collapsing the sidebar.


### Installation

To install `ngx-schedule-planner` in your Angular project, simply run:

```bash
npm install ngx-schedule-planner
```

### Usage
1. Import the `NgxSchedulePlannerModule` module into your Angular module:

    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { NgxSchedulePlannerModule } from 'ngx-schedule-planner';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgxSchedulePlannerModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2. Use the `ngx-schedule-planner` component in your template:

    ```html
    <ngx-schedule-planner
      [content]="mock"
      [mode]="'monthly'"
      [timeRange]="{ hrFrom: 8, hrTo: 17 }"
      (onAddActivityClick)="log($event)"
      (onActivityClick)="log($event)"
      (onSelectRange)="log($event)"
    ></ngx-schedule-planner>
    ```

### Example

```typescript
import { Component } from '@angular/core';
import { ICustomization, ITheme, CalendarContent } from 'ngx-schedule-planner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  log($event: any) {
    console.log($event);
  }

  mock: CalendarContent = {
  colorTags:  {
    1: { colorTagId: 1, color: '#FCFEB5', name: 'Bioinformatics' },
    2: { colorTagId: 2, color: '#9FC3FE', name: 'Biotechnology' },
    3: { colorTagId: 3, color: '#9AF5FE', name: 'Ethical Hacking' }
  },
  activities:  {
  1: {
    activityId: 1,
    groupId: 1,
    name: 'Machine Learning Basics',
    startDate: '2024-04-08T09:00:00',
    endDate: '2024-04-08T13:00:00',
    repeat: ['2024-04-09', '2024-04-15'],
    tags: [1, 2],
    colorTags: [1, 3],
  },
  2: {
    activityId: 2,
    groupId: 2,
    name: 'Data Structures and Algorithms',
    startDate: '2024-04-08T10:00:00',
    endDate: '2024-04-08T13:00:00',
    repeat: ['2024-04-09', '2024-04-11'],
    tags: [3, 4],
    colorTags: [2],
  }
},
  profiles: [
  {
    profileId: 1,
    name: 'Santiago Fernández',
    description: 'Software engineer passionate about artificial intelligence.',
    tags: [3, 5],
    imageUrl:
      'https://img.freepik.com/foto-gratis/primer-plano-hombre-negocios-serio-camisa-blanca-mirando-camara-pie-confiado_1258-26762.jpg',
    activities: [{ activityId: 1 }, { activityId: 2 }],
  },
  {
    profileId: 2,
    name: 'Aisha Patel',
    description: 'Human rights lawyer specializing in advocacy.',
    tags: [7, 8, 9],
    imageUrl:
      'https://img.freepik.com/foto-gratis/elegante-empresaria-segura-sonriendo_176420-19466.jpg',
    activities: [
      { activityId: 1 },
    ],
  }
],
  groups: {
    1: {
      name: 'Programming Courses',
      groupId: 1,
      icon: '👨‍💻',
    },
    2: {
      name: 'Tech Workshops',
      groupId: 2,
      icon: '💻',
    }
  },
  roles:  {
    1: { roleId: 1, label: 'Teacher' },
    2: { roleId: 2, label: 'Assistant' },
  },
  tags:  {
    1: { tagId: 1, icon: '🤖', name: 'Machine Learning' },
    2: { tagId: 2, icon: '📚', name: 'Education' },
    3: { tagId: 3, icon: '💻', name: 'Programming' },
    4: { tagId: 4, icon: '📝', name: 'Algorithm' },
    5: { tagId: 5, icon: '🧠', name: 'Deep Learning' },
    6: { tagId: 6, icon: '📘', name: 'Fundamentals' },
    7: { tagId: 7, icon: '🔗', name: 'Blockchain' },
    8: { tagId: 8, icon: '📊', name: 'Basics' },
    9: { tagId: 9, icon: '🛡️', name: 'Cybersecurity' }
  },
};;
}
```

### Contributions are welcome! 
If you'd like to contribute to ngx-schedule-planner, feel free to open an issue or submit a pull request on [GitHub](https://github.com/tmcx/ngx-schedule-planner-lib).

### Licencia

License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

I hope this README helps you get started with ngx-schedule-planner! If you need further assistance, feel free to ask.
