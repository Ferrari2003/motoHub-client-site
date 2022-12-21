import { Accordion } from "flowbite-react";
import React from "react";
import SetTabTitle from "../../Utility/SetTabTitle";
import TittleHeader from "../Shared/TittleHeader/TittleHeader";

const Blog = () => {
  SetTabTitle("Blog");
  return (
    <div>
      <TittleHeader title={"Blog"}></TittleHeader>
      <div className="container py-8 px-8 mx-auto">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              1.What are the different ways to manage a state in a React
              application?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                There are four main types of state you need to properly manage
                in your React apps:
              </p>
              <ul>
                <li>1.Local state</li>
                <li>2.Global state</li>
                <li>3.Server state</li>
                <li>4.URL state</li>
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              2.How does prototypical inheritance work?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The Prototypal Inheritance is a feature in javascript used to
                add methods and properties in objects. It is a method by which
                an object can inherit the properties and methods of another
                object. Traditionally, in order to get and set the [[Prototype]]
                of an object, we use Object. getPrototypeOf and Object.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              3.What is a unit test? Why should we write unit tests?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main objective of unit testing is to isolate written code to
                test and determine if it works as intended. Unit testing is an
                important step in the development process, because if done
                correctly, it can help detect early flaws in code which may be
                more difficult to find in later testing stages.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>4.React vs. Angular vs. Vue?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Vue provides higher customizability and hence is easier to learn
                than Angular or React. Further, Vue has an overlap with Angular
                and React with respect to their functionality like the use of
                components. Hence, the transition to Vue from either of the two
                is an easy option.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default Blog;
